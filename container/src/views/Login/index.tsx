import React, { useMemo, useState } from 'react';
import styles from './style.less';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, UseControllerProps, useForm } from 'react-hook-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { userLoginApi } from '@/api/user';
import { LoginForm } from '@/type/user';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const form = useForm<LoginForm>({
    defaultValues: {
      username: 'admin',
      password: '123456',
    },
    mode: 'onChange',
  });

  const controllers = useMemo<{
    username: UseControllerProps<LoginForm, 'username'>;
    password: UseControllerProps<LoginForm, 'password'>;
  }>(() => {
    return {
      username: {
        name: 'username',
        rules: {
          required: '用户名不能为空',
        },
      },
      password: {
        name: 'password',
        rules: {
          required: '密码不能为空',
        },
      },
    };
  }, []);

  const submit = form.handleSubmit(async (values: LoginForm) => {
    try {
      setLoading(true);
      const res = await userLoginApi(values);
      if (res) {
        return navigate('/', { replace: true });
      }
    } catch {}
    setLoading(false);
  });

  const { errors } = form.formState;

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Form className={styles.form} onFinish={submit}>
          <div className={styles.title}>my-react</div>
          <Controller
            {...controllers.username}
            control={form.control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.username && 'error'}
                help={errors.username?.message}
              >
                <Input
                  {...field}
                  size="large"
                  placeholder="请输入用户名"
                  autoComplete="off"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            )}
          />
          <Controller
            {...controllers.password}
            control={form.control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.password && 'error'}
                help={errors.password?.message}
              >
                <Input
                  {...field}
                  size="large"
                  type="password"
                  placeholder="请输入密码"
                  autoComplete="off"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
            )}
          />
          <Form.Item>
            <Button
              className={styles.button}
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
            >
              登&nbsp;录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
