import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {PageLoading} from '@ant-design/pro-components';
import type {RunTimeLayoutConfig} from 'umi';
import {history, Link} from 'umi';
import defaultSettings from '../config/defaultSettings';
import {currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import {RequestConfig} from "@@/plugin-request/request";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';
/**
 * 没有用户信息名单
 */
const NO_NEED_LOGIN_WHITE_LIST = [loginPath, registerPath, '/user'];

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export const request: RequestConfig = {
  prefix:process.env.NODE_ENV=== 'production'?'http://sheep-fronted.cn':undefined,
  timeout: 1000000,
};


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.BaseResponse<API.CurrentUser>;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.BaseResponse<API.CurrentUser> | undefined>;
}> {
  const fetchUserInfo = async () => {
    //如果没有获取到当前用户的信息
    //跳转到登录页面
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (!NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname) ) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    // @ts-ignore
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState}) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // 用户名水印
    waterMarkProps: {
      content: initialState?.currentUser?.data.username,
    },
    footerRender: () => <Footer />,
    // 跳转页面执行
    onPageChange: () => {
      const { location } = history;
      // 定义白名单，除了登录页和注册页之外，进行重定向
      if(NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)){
        return
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,

    ...initialState?.settings,
  };
};
