import { Button, Form, Input, Modal } from "antd";
import type { FC } from "react";

export type ChangePasswordValues = {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
};

type ChangePasswordModalProps = {
  confirmLoading: boolean;
  onCancel: () => void;
  onSubmit: (values: ChangePasswordValues) => void;
  open: boolean;
};

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  confirmLoading,
  onCancel,
  onSubmit,
  open,
}) => {
  const [form] = Form.useForm<ChangePasswordValues>();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Đổi mật khẩu tài khoản"
      open={open}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu mới",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="text-right">
          <Button onClick={handleCancel} className="mr-2">
            Hủy
          </Button>
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
