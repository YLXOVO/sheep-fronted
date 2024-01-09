import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import { message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history, useModel} from 'umi';
import {MY_LOGO} from "@/constants";
import styles from './index.less';


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      const {userPassword,checkPassword} = values
      if(userPassword !== checkPassword){
        message.error("两次输入的密码不一致");
        return
      }

      // 注册
      const id = await register(values)
      if (id ) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push("/user/login?redirect="+redirect);
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={MY_LOGO} />}
          title="Sheep 用户一站通"
          subTitle={'成为最好的管理系统'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={
            {
              searchConfig: {
                submitText: '注册',
              }
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'新用户注册'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账户'}
                rules={[
                  {
                    required: true,
                    message: '账户是必填项',
                  },
                  {
                    min: 4,
                    type: 'string',
                    message: '用户名长度不能小于4',
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不能小于8',
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码为必填项',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "密码不能小于8位"
                  }
                ]}
              />
            </>
          )}

        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
