import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const UserRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecords = () => {
    setLoading(true);
    axios.get('https://sbhnbx5vf7.execute-api.us-east-1.amazonaws.com/records', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = (recordId) => {
    axios.delete(`https://sbhnbx5vf7.execute-api.us-east-1.amazonaws.com/records/${recordId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setRecords(records.filter((record) => record.id !== recordId));
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const columns = [
  {
      name: 'Operation Type',
      selector: 'operation_id',
      sortable: true,
    },
    {
      name: 'Response',
      selector: 'operation_response',
      sortable: true,
    },
    {
      name: 'Cost',
      selector: 'cost',
      sortable: true,
    },
    {
      name: 'User Balance',
      selector: 'user_balance',
      sortable: true,
    },
    
    {
      name: 'Timestamp',
      selector: 'timestamp',
      sortable: true,
    },
    {
      name: 'Delete',
      cell: (row) => <button onClick={() => handleDelete(row.id)}>Delete</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <h2>User Records</h2>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <DataTable
          columns={columns}
          data={records}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          sortIcon={<i className="fas fa-sort" />}
          noHeader
        />
      )}
    </div>
  );
};

export default UserRecords;