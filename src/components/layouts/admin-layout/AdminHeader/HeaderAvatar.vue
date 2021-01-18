<template>
  <a-dropdown :trigger="['click']">
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar
        class="avatar"
        size="large"
        :icon="!user || !user.avatar ? 'user' : ''"
        shape="circle"
        :src="user && user.avatar ? user.avatar : ''"
      />
      <span class="name" style="margin-left:10px;margin-right:10px;">
        {{ user.name || '未知' }}
      </span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item v-if="personalCenterShow">
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item v-if="settingShow">
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-sub-menu key="test" style="overflow: hidden;">
        <template slot="title">
          <a-popover placement="left" v-model="show" trigger="click">
            <div class="popvoer_content">
              <div>
                <a-icon
                  :style="
                    `color: ${
                      user.user && user.user.ask_online_status
                        ? '#52C41A'
                        : '#FF4D4F'
                    };marginRight: 4px`
                  "
                  theme="filled"
                  :type="
                    user.user && user.user.ask_online_status
                      ? 'check-circle'
                      : 'stop'
                  "
                />
                {{ user.user && user.user.ask_online_status ? '在线' : '挂起' }}
              </div>
              <a-icon type="sync" />
            </div>
            <template slot="content">
              <div class="status-content">
                <div class="title">在线状态信息设置</div>
                <div class="tip">仅限公司内部同事可见</div>
                <div class="label">选择状态类别</div>
                <a-radio-group v-model="onlineStatus" @change="onChange">
                  <a-radio :style="radioStyle" :value="1">
                    在线
                  </a-radio>
                  <a-radio :style="radioStyle" :value="0">
                    挂起
                  </a-radio>
                </a-radio-group>
                <a-form-model
                  ref="ruleForm"
                  v-if="onlineStatus === 0"
                  :model="form"
                  :rules="rules"
                >
                  <a-form-model-item
                    label="预计上线时间"
                    prop="predict_online_at"
                  >
                    <a-time-picker
                      style="width: 200px"
                      :getPopupContainer="
                        triggerNode => {
                          return triggerNode.parentNode;
                        }
                      "
                      v-model="form.predict_online_at"
                      input-read-only
                      :default-open-value="moment(new Date())"
                    >
                      <a-icon slot="suffixIcon" type="smile" />
                    </a-time-picker>
                  </a-form-model-item>
                  <a-form-model-item label="挂起原因" prop="hang_up_reason">
                    <div class="textarea">
                      <a-textarea
                        :auto-size="{ minRows: 3, maxRows: 3 }"
                        v-model="form.hang_up_reason"
                        placeholder="请输入挂起原因"
                      >
                      </a-textarea>
                      <div class="number">
                        {{ form.hang_up_reason.length }} / 20
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item>
                    <a-button style="margin-right: 10px;" @click="resetForm">
                      取消
                    </a-button>
                    <a-button type="primary" @click="onSubmit">
                      确认
                    </a-button>
                  </a-form-model-item>
                </a-form-model>
              </div>
            </template>
          </a-popover>
        </template>
      </a-sub-menu>
      <a-menu-item @click="logoutHandle">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import client from '@/utils/client';
import { removeToken } from '@/utils/auth';
import { get } from '@/utils/options';
export default {
  name: 'HeaderAvatar',
  props: {
    personalCenterShow: {
      type: Boolean,
      default: false
    },
    settingShow: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {
        return {
          avatar: '',
          name: '',
          user: {}
        };
      }
    }
  },
  watch: {
    show() {
      this.onlineStatus = this.user.user?.ask_online_status;
    }
  },
  computed: {},
  data() {
    return {
      onlineStatus: '',
      show: false,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      form: {
        predict_online_at: '',
        hang_up_reason: ''
      },
      rules: {
        predict_online_at: [
          { required: true, message: '请选择时间', trigger: ['change', 'blur'] }
        ],
        hang_up_reason: [
          {
            required: true,
            message: '请填写原因',
            trigger: ['change', 'blur']
          },
          {
            required: true,
            max: 20,
            message: '最多20个字',
            trigger: ['change', 'blur']
          }
        ]
      }
    };
  },
  methods: {
    moment,
    async onChange(e) {
      const value = e.target.value;
      this.onlineStatus = value;
      if (value) {
        try {
          await client.put(get('options').onlineStatusPath, {
            data: { online_status: value }
          });
          this.handleSuccess();
        } catch (error) {
          console.log(error);
        }
      }
    },
    logoutHandle() {
      const logoutURL = get('options').logoutURL;
      client.post(logoutURL).then(() => {
        removeToken();
        location.reload();
      });
    },
    async handleSuccess() {
      const res = await client.get('/v2/admin/userinfo');
      this.$store.commit('evo/setUserInfo', res);
      this.$message.success({ content: '状态修改成功！' });
      this.show = false;
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            await client.put(get('options').onlineStatusPath, {
              data: {
                online_status: 0,
                hang_up_reason: this.hang_up_reason,
                predict_online_at: this.predict_online_at
              }
            });
            this.handleSuccess();
            this.$refs.ruleForm.resetFields();
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="scss">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
.popvoer_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-content {
  width: 280px;
  height: 500px;
  padding: 12px 8px;
  margin: 0;

  .title {
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }

  .tip {
    display: inline-block;
    margin-top: 14px;
    margin-bottom: 20px;
    background: rgba(24, 144, 255, 0.1);
    border-radius: 10px;
    padding: 4px 10px;
    color: #1890ff;
    font-size: 12px;
  }

  .label {
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 8px;
  }

  .textarea {
    position: relative;

    .number {
      position: absolute;
      bottom: 10px;
      right: 10px;
      text-align: right;
      line-height: 1;
    }
  }
}
</style>
