"use client";

import {useEffect, useRef, useState} from "react";
import { TableColumnsType, Input, message, Button } from "antd";
import { IBeneficiary } from "@/types/IBeneficiary";
import { getBeneficiaries } from "@/lib/actions/beneficiaries.actions";
import TableComponent from "./table";
import { useModal } from "@/app/store/modalStore";
import BeneficiaryForm, { BeneficiaryFormRef } from "../form/BeneficiaryForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {getDonors} from "@/lib/actions/donors.actions";
import {IDonor} from "@/types/IDonor";
import DonorForm from "@/components/form/DonorForm";


const { Search } = Input;

const BeneficiaryTable: React.FC<{ refresh: boolean }> = ({ refresh }) => {
  const [data, setData] = useState<IBeneficiary[]>([]);
  const [filteredData, setFilteredData] = useState<IBeneficiary[]>([]);
  const [searchText, setSearchText] = useState("");
  const {openModal, closeModal } = useModal();
  const [refreshTable, setRefreshTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<BeneficiaryFormRef | null>(null);

  const deleteBeneficiary = async (_id: string) => {
    try {
      const response = await fetch(`/api/beneficiaries/${_id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
  
      message.success("Bénéficiaire supprimé avec succès");
  
      // 🔥 Mise à jour immédiate de la liste après suppression
      setData((prevData) => prevData.filter((b) => b._id.toString() !== _id));
      setFilteredData((prevData) => prevData.filter((b) => b._id.toString() !== _id));
  
    } catch (error) {
      message.error("Échec de la suppression");
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const beneficiaries = await getBeneficiaries();
      const formattedData = beneficiaries.map((b: IBeneficiary) => ({
        ...b,
        key: b._id, // Ajoute `key` requis par Ant Design
      }));
      setData(formattedData);
      setFilteredData(formattedData); 
    } catch (error) {message.error("Erreur lors du chargement des bénéficiaires");
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [refreshTable]);

  const editBeneficiaryModal = (beneficiary: IBeneficiary) => {
    openModal({
      title: "Modifier ce bénéficiaire",
      component: <BeneficiaryForm beneficiary={beneficiary} ref={formRef} />,
      okText: "Modifier",
      cancelText: "Annuler",
      onOk: async () => {
        if (formRef.current) {
          try {
            await formRef.current.validateFields(); // ✅ Valide les champs
            await formRef.current.submit(); // ✅ Soumet le formulaire
            closeModal(); // ✅ Ferme la modal après soumission
            setRefreshTable((prev) => !prev); // ✅ Rafraîchit la table
          } catch (error) {
            console.error("Validation échouée (bénéficiaire)", error);
          }
        }
      },
    });
  };

  const columns: TableColumnsType<IBeneficiary> = [
    {
      title: "Nom",
      dataIndex: "name",
      render: (name: string, record: IBeneficiary) => (
        <Button type="link" onClick={() => editBeneficiaryModal(record)}>
          {name}
        </Button>
      ),
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
    {
      title: "Actions",
      render: (_, record: IBeneficiary) => (
        <div className="flex space-x-3">
          <Button
            type="primary"
            onClick={() => {
              editBeneficiaryModal(record);
            }}
            icon={<EditOutlined />}
          />
          <Button
            danger
            onClick={() => {
              if (window.confirm("Voulez-vous vraiment supprimer ce bénéficiaire ?")) {
                deleteBeneficiary(record._id.toString());
              }
            }}
            icon={<DeleteOutlined />}
          />
        </div>

      ),
    }
  ];
  
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
      <div className="flex justify-center">
        <Search
          placeholder="Rechercher un bénéficiaire..."
          allowClear
          size="middle"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: 600, marginBottom: 5 }}
        />
      </div>
      <TableComponent columns={columns} data={filteredData} />
    </div>
  );
};

export default BeneficiaryTable;
