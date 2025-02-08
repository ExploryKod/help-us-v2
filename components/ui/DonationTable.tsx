"use client";

import { useEffect, useState } from "react";
import { TableColumnsType, Input, message } from "antd";
import TableComponent from "./table";
import { IDonation } from "@/types/IDonnation";
import { getDonations } from "@/lib/actions/donations.actions";
import dayjs from "dayjs";

const { Search } = Input;

const columns: TableColumnsType<IDonation> = [
  {
    title: "Montant",
    dataIndex: "amount",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Description",
    dataIndex: "grade",
  },
  {
    title: "Date et heure",
    dataIndex: "date",
    render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
  },
];

const DonationTable: React.FC = () => {
  const [data, setData] = useState<IDonation[]>([]);
  const [filteredData, setFilteredData] = useState<IDonation[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donations = await getDonations();
        const formattedData = donations.map((d: IDonation) => ({
          ...d,
          key: d._id, // Ajoute `key` requis par Ant Design
        }));
        setData(formattedData);
        setFilteredData(formattedData); // Initialise `filteredData` avec toutes les données
      } catch (error) {
        message.error("Erreur lors du chargement des donations");
      }
    };
    fetchData();
  }, []);

  // Fonction de recherche
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data.filter((donation) =>
      Object.values(donation).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleSelection = (selectedRowKeys: React.Key[], selectedRows: IDonation[]) => {
    console.log("Selected donations:", selectedRows);
  };

  const handleRowClick = (record: IDonation) => {
    message.info(`Détails de la donation: ${record.amount}€`);
  };

  return (
    <div>
      {/* Barre de recherche */}
      <div className="flex justify-center">
        <Search
          placeholder="Rechercher une donation..."
          allowClear
          size="middle"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: 600, marginBottom: 5 }}
        />
    </div>
      <TableComponent<IDonation>
        columns={columns}
        data={filteredData}
        onRowSelection={handleSelection}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default DonationTable;
