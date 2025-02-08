"use client";

import { useEffect, useState } from "react";
import { TableColumnsType, Input, message } from "antd";
import { IDonor } from "@/types/IDonor";
import TableComponent from "./table";
import { getDonors } from "@/lib/actions/donors.actions";

const { Search } = Input;

const columns: TableColumnsType<IDonor> = [
  {
    title: "Nom",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Téléphone",
    dataIndex: "phone",
  },
  {
    title: "Type de don",
    dataIndex: "donationType",
  },
  {
    title: "Statut",
    dataIndex: "status",
  },
];

const DonorTable: React.FC = () => {
  const [data, setData] = useState<IDonor[]>([]);
  const [filteredData, setFilteredData] = useState<IDonor[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donors = await getDonors();
        const formattedData = donors.map((b: IDonor) => ({
          ...b,
          key: b._id, // Ajoute `key` requis par Ant Design
        }));
        setData(formattedData);
        setFilteredData(formattedData); // Initialise `filteredData` avec toutes les données
      } catch (error) {
        message.error("Erreur lors du chargement des donateurs");
      }
    };
    fetchData();
  }, []);

  // Fonction de recherche
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = data.filter((beneficiary) =>
      Object.values(beneficiary).some((field) =>
        field?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };



  return (
    <div>
      {/* Barre de recherche */}
      <div className="flex justify-center">
      <Search
        placeholder="Rechercher un donateur..."
        allowClear
         size="middle"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ maxWidth: 600, marginBottom: 5 }}
      />
      </div>
      <TableComponent<IDonor>
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default DonorTable;
