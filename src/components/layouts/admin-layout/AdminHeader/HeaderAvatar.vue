<template>
  <a-dropdown :trigger="['click']" @visibleChange="visibleChange">
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
    <a-menu :class="['avatar-menu']" slot="overlay" style="width: 200px">
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
                      user.user && user.user.online_status
                        ? '#52C41A'
                        : '#FF4D4F'
                    };marginRight: 4px`
                  "
                  theme="filled"
                  :type="
                    user.user && user.user.online_status
                      ? 'check-circle'
                      : 'stop'
                  "
                />
                {{ user.user && user.user.online_status ? '在线' : '挂起' }}
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
                    prop="predictOnlineAt"
                  >
                    <a-time-picker
                      style="width: 200px"
                      :getPopupContainer="
                        triggerNode => {
                          return triggerNode.parentNode;
                        }
                      "
                      v-model="form.predictOnlineAt"
                      input-read-only
                      :default-open-value="get('options').Moment(new Date())"
                    >
                      <a-icon slot="suffixIcon" type="smile" />
                    </a-time-picker>
                  </a-form-model-item>
                  <a-form-model-item label="挂起原因" prop="hangUpReason">
                    <div class="textarea">
                      <a-textarea
                        :auto-size="{ minRows: 3, maxRows: 3 }"
                        v-model="form.hangUpReason"
                        placeholder="请输入挂起原因"
                      >
                      </a-textarea>
                      <div class="number">
                        {{ form.hangUpReason.length }} / 20
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
      <a-menu-item v-if="user.user && !user.user.online_status">
        挂起时长:
        {{ `${hangUpTime.hours}:${hangUpTime.minutes}:${hangUpTime.seconds}` }}
      </a-menu-item>
      <a-menu-item v-if="user.user && !user.user.online_status">
        <div class="info">
          <div>
            {{ user.user && user.user.hang_up_reason }}
          </div>
          <div style="marginTop: 8px">
            预计上线时间：
            {{
              user.user && user.user.predict_online_at
                ? get('options')
                    .Moment(user.user.predict_online_at)
                    .format('HH:MM')
                : '未知'
            }}
          </div>
        </div>
      </a-menu-item>
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
import { addZero } from '@/utils/time';

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
    show(v) {
      this.onlineStatus = this.user.user?.online_status;
      if (!v)
        this.form = {
          predictOnlineAt: '',
          hangUpReason: ''
        };
    }
  },
  computed: {
    hangUpTime() {
      const diffTime = this.durationWithDiff(
        this.user.user && this.user.user.hang_up_at,
        this.now
      );
      return {
        hours: addZero(diffTime.hours()),
        minutes: addZero(diffTime.minutes()),
        seconds: addZero(diffTime.seconds())
      };
    }
  },
  data() {
    return {
      onlineStatusPath: get('options').onlineStatusPath,
      logoutURL: get('options').logoutURL,
      onlineStatus: '',
      show: false,
      now: new Date(),
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      form: {
        predictOnlineAt: '',
        hangUpReason: ''
      },
      rules: {
        predictOnlineAt: [
          { required: true, message: '请选择时间', trigger: ['change', 'blur'] }
        ],
        hangUpReason: [
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
    get,
    async onChange(e) {
      const value = e.target.value;
      this.onlineStatus = value;
      if (value) {
        try {
          await client.put(this.onlineStatusPath, {
            data: { online_status: value }
          });
          this.handleSuccess();
        } catch (error) {
          console.log(error);
        }
      }
    },
    logoutHandle() {
      client.post(this.logoutURL).then(() => {
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
      this.show = false;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          try {
            await client.put(this.onlineStatusPath, {
              data: {
                online_status: 0,
                hang_up_reason: this.form.hangUpReason,
                predict_online_at: this.form.predictOnlineAt
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
    },
    visibleChange(e) {
      if (e) {
        this.now = new Date();
        this.timer = setInterval(() => {
          this.now = new Date();
        }, 1000);
      } else {
        clearInterval(this.timer);
      }
    },
    durationWithDiff(time, end) {
      const startDate = get('options').Moment(time);
      const endDate = get('options').Moment(end || new Date());
      return get('options').Moment.duration(endDate.diff(startDate));
    }
  }
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
.info {
  padding: 16px 0;
  border-top: 1px solid #eceef4;
  border-bottom: 1px solid #eceef4;
  white-space: pre-wrap;
}
</style>
