import React, { useEffect, useMemo } from 'react';
import styles from './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGet, fetchSet } from '@/flow/ComponentInfo/actions';
import { InfoForm } from '@/flow/ComponentInfo/interface';
import { Form, Input, InputNumber, message, Modal } from 'antd';
import { Controller, UseControllerProps, useForm } from 'react-hook-form';
import { urlSearchToObject } from '@/utils/formatter';
import { useMemoizedFn } from 'ahooks';

const ComponentInfo = (props: { onSubmit?: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { onSubmit } = props;

  const loading = useSelector((state) => state.componentInfo.loading);

  enum TYPE {
    ADD = 'add',
    EDIT = 'edit',
    SHOW = 'show',
  }

  const { type, id } = useMemo(() => {
    const search = urlSearchToObject(location.search);
    let { id, type } = search || {};
    if (type) {
      if (type === TYPE.EDIT || type === TYPE.SHOW) {
        if (!id) {
          type = TYPE.ADD;
        }
      } else if (type === TYPE.ADD) {
        id = undefined;
      } else {
        type = undefined;
        id = undefined;
      }
    }
    return { type, id: Number(id) || undefined };
  }, [location.search]);

  const title =
    type === TYPE.ADD
      ? '添加'
      : type === TYPE.EDIT
      ? '编辑'
      : type === TYPE.SHOW
      ? '查看'
      : '';

  const form = useForm<InfoForm>({
    defaultValues: {
      id,
      name: '',
      value: null,
    },
    mode: 'onChange',
  });

  const controllers = useMemo<{
    name: UseControllerProps<InfoForm, 'name'>;
    value: UseControllerProps<InfoForm, 'value'>;
  }>(() => {
    return {
      name: {
        name: 'name',
        rules: {
          required: '名称不能为空',
        },
      },
      value: {
        name: 'value',
        rules: {
          required: '值不能为空',
        },
      },
    };
  }, []);

  const submit = form.handleSubmit(async (values: InfoForm) => {
    const { id, name, value } = values;
    await dispatch(fetchSet({ id, name, value: value! }))
      .unwrap()
      .then(() => {
        onClose();
        onSubmit?.();
      })
      .catch((e) => {
        message.error(e?.message || '服务器异常');
      });
  });

  useEffect(() => {
    if (type) {
      form.reset({
        id,
        name: '',
        value: null,
      });
      form.clearErrors();
      if (id) {
        dispatch(fetchGet(id))
          .unwrap()
          .then((values) => {
            form.setValue('name', values.name);
            form.setValue('value', values.value);
          })
          .catch((e) => {
            message.error(e?.message || '服务器异常');
          });
      }
    }
  }, [type, id]);

  const onClose = useMemoizedFn(() => {
    navigate(location.pathname, { replace: true });
  });

  const { errors } = form.formState;

  return (
    <Modal
      open={!!type}
      title={title}
      onOk={submit}
      onCancel={onClose}
      okButtonProps={{
        hidden: type === TYPE.SHOW,
      }}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Controller
          {...controllers.name}
          control={form.control}
          render={({ field }) => (
            <Form.Item
              validateStatus={errors.name && 'error'}
              help={errors.name?.message}
              label="名称"
              required
            >
              <Input
                readOnly={type === TYPE.SHOW}
                {...field}
                autoComplete="off"
              />
            </Form.Item>
          )}
        />
        <Controller
          {...controllers.value}
          control={form.control}
          render={({ field }) => (
            <Form.Item
              validateStatus={errors.value && 'error'}
              help={errors.value?.message}
              label="值"
              required
            >
              <InputNumber
                readOnly={type === TYPE.SHOW}
                className={styles.field}
                {...field}
                precision={0}
              />
            </Form.Item>
          )}
        />
      </Form>
    </Modal>
  );
};

export default ComponentInfo;
