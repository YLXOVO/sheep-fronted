import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {YLXOVO_GITHUB,YLXOVO} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = 'YLXOVO 出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'myBlog',
          title: '站长博客',
          href: YLXOVO,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /></>,
          href: YLXOVO_GITHUB,
          blankTarget: true,
        },
        {
          key: 'CSDN',
          title: 'CSDN',
          href: 'https://blog.csdn.net/m0_59751050',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
