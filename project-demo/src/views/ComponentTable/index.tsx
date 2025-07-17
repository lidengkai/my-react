import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import styles from './style.less';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '@/flow/ComponentTable/reducer';
import {
  fetchDelete,
  fetchList,
  fetchSetStatus,
} from '@/flow/ComponentTable/actions';
import {
  Button,
  Card,
  Input,
  message,
  Select,
  Space,
  Switch,
  Table,
  TableProps,
} from 'antd';
import { TestItem } from '@/types/test';
import Link from '@components/components/Link';
import { useNavigate } from 'react-router-dom';
import { ROUTE_ROOT } from '@/config';
import { useMemoizedFn } from 'ahooks';
import { PlusOutlined } from '@ant-design/icons';

const ComponentInfo = lazy(
  () => import(/* webpackChunkName: "ComponentInfo" */ '@/views/ComponentInfo')
);

const ComponentTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.componentTable.loading);
  const current = useSelector((state) => state.componentTable.current);
  const pageSize = useSelector((state) => state.componentTable.pageSize);
  const total = useSelector((state) => state.componentTable.total);
  const list = useSelector((state) => state.componentTable.list);
  const name = useSelector((state) => state.componentTable.name);
  const status = useSelector((state) => state.componentTable.status);

  const columns = useMemo<NonNullable<TableProps<TestItem>['columns']>>(() => {
    return [
      {
        key: 'id',
        dataIndex: 'id',
        title: 'ID',
        width: 100,
      },
      {
        dataIndex: 'name',
        title: '名称',
        width: 100,
      },
      {
        dataIndex: 'status',
        title: '状态',
        width: 100,
        render: (value, record) => {
          return value == 1 || value == 0 ? (
            <Link
              onClick={() => {
                dispatch(fetchSetStatus({ id: record.id!, status: value ^ 1 }))
                  .unwrap()
                  .then(() => {
                    refresh(true);
                  })
                  .catch((e) => {
                    message.error(e?.message || '服务器异常');
                  });
              }}
            >
              <a>
                <Switch
                  checked={value == 1}
                  checkedChildren="启动"
                  unCheckedChildren="暂停"
                />
              </a>
            </Link>
          ) : null;
        },
      },
      {
        dataIndex: 'value',
        title: '值',
        sorter: true,
        width: 100,
      },
      {
        key: 'operate',
        dataIndex: 'id',
        title: '操作',
        width: 150,
        render: (_, record) => {
          return (
            <Space>
              <Link
                onClick={() => {
                  navigate(
                    `${ROUTE_ROOT}/component/table?type=show&id=${record.id}`,
                    {
                      replace: true,
                    }
                  );
                }}
              >
                <a>查看</a>
              </Link>
              <Link
                onClick={() => {
                  navigate(
                    `${ROUTE_ROOT}/component/table?type=edit&id=${record.id}`,
                    {
                      replace: true,
                    }
                  );
                }}
              >
                <a>编辑</a>
              </Link>
              <Link
                confirm={{ content: '删除后不可恢复，确定要删除吗?' }}
                onClick={() => {
                  dispatch(fetchDelete(record.id!))
                    .unwrap()
                    .then(() => {
                      refresh(true);
                    })
                    .catch((e) => {
                      message.error(e?.message || '服务器异常');
                    });
                }}
              >
                <a>删除</a>
              </Link>
            </Space>
          );
        },
      },
    ];
  }, []);

  useEffect(() => {
    return () => {
      dispatch(actions.destroy());
    };
  }, []);

  useEffect(() => {
    refresh(true);
  }, []);

  const refresh = useMemoizedFn(async (init = false) => {
    await dispatch(fetchList(init))
      .unwrap()
      .catch((e) => {
        message.error(e?.message || '服务器异常');
      });
  });

  return (
    <>
      <Card className={styles.root}>
        <Space className={styles.search}>
          <Input.Search
            className={styles.item}
            value={name}
            onChange={(e) => {
              dispatch(actions.changeName(e.target.value));
            }}
            onBlur={() => {
              refresh(true);
            }}
            onSearch={() => {
              refresh(true);
            }}
            enterButton
            placeholder="名称"
          />
          <Select
            className={styles.item}
            value={status}
            onChange={(value) => {
              dispatch(actions.changeStatus(value));
              refresh(true);
            }}
            mode="multiple"
            allowClear
            placeholder="状态"
          >
            <Select.Option value={1}>启用</Select.Option>
            <Select.Option value={0}>暂停</Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={() => {
              navigate(`${ROUTE_ROOT}/component/table?type=add`, {
                replace: true,
              });
            }}
          >
            <PlusOutlined />
            添加
          </Button>
        </Space>
        <Table
          sticky
          rowKey="id"
          loading={loading}
          columns={columns}
          onChange={(pagination, _, sorter: any) => {
            const { current, pageSize } = pagination;
            if (current && pageSize) {
              dispatch(
                actions.changeTable({
                  current,
                  pageSize,
                  sort: sorter.field,
                  order: sorter.order,
                })
              );
              refresh();
            }
          }}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100'],
          }}
          dataSource={list}
        />
      </Card>
      <Suspense>
        <ComponentInfo
          onSubmit={() => {
            refresh(true);
          }}
        />
      </Suspense>
    </>
  );
};

export default ComponentTable;
