import { Button, notification } from 'antd';

export const notifyError = (title, description) => {
  return notification.error({
    message: `${title} error`,
    description
  });
};

export const notifySuccess = (title, description) => {
  return notification.success({
    message: `${title} success`,
    description
  });
};

const btn = (
  <Button type="primary" size="small" onClick={() => {}}>
    Join
  </Button>
);

export const notifyInvite = (name, description) => {
  return notification.info({
    message: `${name} invite you to play.`,
    description,
    btn
  });
};
