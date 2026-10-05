import { Table } from 'antd';
import './style.scss'

const ListTable = ({ scroll, ...props }) => {
  const { columns, data, loading, pagination } = props

  console.log("pagination", pagination)

  return (
    <Table columns={columns} scroll={scroll} dataSource={data} pagination={pagination && { pageSize: 10 }} loading={loading} />
  )
}

export default ListTable;
