"use client";

import { useEffect, useState } from "react";
import { TableColumnsType, Input, message } from "antd";
import { IBeneficiary } from "@/types/IBeneficiary";
import { getBeneficiaries } from "@/lib/actions/beneficiaries.actions";
import TableComponent from "./table";

const { Search } = Input;

const columns: TableColumnsType<IBeneficiary> = [
  {
    title: "Nom",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Besoins",
    dataIndex: "needs",
  },
  {
    title: "Statut",
    dataIndex: "status",
  },
];

const BeneficiaryTable: React.FC = () => {
  const [data, setData] = useState<IBeneficiary[]>([]);
  const [filteredData, setFilteredData] = useState<IBeneficiary[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const beneficiaries = await getBeneficiaries();
        const formattedData = beneficiaries.map((b: IBeneficiary) => ({
          ...b,
          key: b._id, // Ajoute `key` requis par Ant Design
        }));
        setData(formattedData);
        setFilteredData(formattedData); // Initialise `filteredData` avec toutes les données
      } catch (error) {
        message.error("Erreur lors du chargement des bénéficiaires");
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
          placeholder="Rechercher un bénéficiaire..."
          allowClear
          size="middle"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: 600, marginBottom: 5 }}
        />
    </div>
      {/* Tableau des bénéficiaires */}
      <TableComponent<IBeneficiary>
        columns={columns}
        data={filteredData}
      />
    </div>
  );
};

export default BeneficiaryTable;
