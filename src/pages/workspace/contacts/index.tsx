import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";

import Workspace from "../../../components/WorkspaceWrapper";
import { authOptions } from "../../api/auth/[...nextauth]";
import Table, { TColumns } from "../../../components/MaterialTable/Table";
import { AutoComplete, Checkbox, Select } from "@geist-ui/core";
import { trpc } from "../../../utils/trpc";
import { useState } from "react";
import { prisma } from "../../../server/db/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: true,
      },
    };
  }
  console.log(context.query);
  const id_client = context.query.id_client;

  if (id_client) {
    return {
      props: {
        session,
        id_client,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
};

const index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const client = trpc.useQuery(["client.getAll"]);
  const readOnly = props.id_client ? true : false;

  const columnsClient: Array<TColumns> = [
    {
      title: "Nom",
      field: "nom",
    },
    {
      title: "Prénom",
      field: "prenom",
    },
    {
      title: "Téléphone",
      field: "telephone",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      },
    },
    {
      title: "Email",
      field: "email",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      },
    },
    {
      title: "Fonction",
      field: "fonction",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
      },
    },

    {
      title: "Client",
      field: "client.libelle",
      // editComponent:(props:any)=>{

      //  return <AutoComplete  value={props.value}  disabled={readOnly}  onSelect={(e: any) => props.onChange(e)} disableFreeSolo options={client.data?.map((t,i)=>({label:t.libelle,value:t.libelle}))} />

      // }
      editComponent: (props: any) => {
   let l
   if(readOnly){
    l=client.data?.filter((f) => f.id == props.id_client)[0]?.libelle
    console.log("client",client?.data?.filter((f) => f.id == props.id_client)[0]);
    console.log("id_client",props.id_client);
    
    console.log("l",l);
    
   }
        return (
          <Select
            disabled={readOnly}
            value={readOnly?l:props.value}
            placeholder="Choisir un client"
            onChange={(e: any) => props.onChange(e)}
          >
            {client.data?.map((t, i) => (
              <Select.Option key={i} value={t.libelle}>
                {t.libelle}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    // {
    //     title: "DBID",
    //     field: "dbid",
    //     cellStyle:{
    //       opacity:'70%',
    //       fontSize:"14px"
    //     }
    //   },
    // {
    //     title: "Référence",
    //     field: "reference",
    //     cellStyle:{
    //       opacity:'70%',
    //       fontSize:"14px"
    //     }
    //   },
    //   {
    //     title: "Disponibilité",
    //     field: "disponibilite",
    //     align:'center',
    //     render:(rowData:any)=>{
    //       console.log(rowData);
    //       const text=rowData.disponibilite?"disponible":"indisponible"

    //       return <span className={`text-sm px-3 py-2 text-white  rounded-md ${rowData.disponibilite?"bg-amber-600" :"bg-red-600"}`}>{text}</span>
    //     },
    //     editComponent:(props:any)=>{

    //       return <div className="flex justify-center items-center "><Checkbox scale={2.4} type="warning" checked={props.value} onChange={(e: any) => {

    //         props.onChange(e.target.checked)
    //       }}/></div>
    //     }

    //   },
  ];

  const filter = (data: Array<any>) => {
    return data ? data.filter((t) => t.id_client == props.id_client) : [];
  };
  return (
    <Workspace>
      <Table
        title={
          readOnly
            ? "Contacts du client " +
              client?.data?.filter((f) => f.id == props.id_client)[0]?.libelle
            : "Contacts"
        }
        filter={readOnly ? filter : undefined}
        columns={columnsClient}
        endpoint="contact"
      />
    </Workspace>
  );
};

export default index;
