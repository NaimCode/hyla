import { Button, Input, Select } from "@geist-ui/core";
import { compareAsc } from "date-fns";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Table, { TColumns } from "../../components/MaterialTable/Table";

import Workspace from "../../components/WorkspaceWrapper";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

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

  return {
    props: {
      session,
    },
  };
};

const Index: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const client = trpc.useQuery(["client.getAll"]);
  const appliances = trpc.useQuery(["appliance.getAll"]);
  const router = useRouter();

  const columnsPov: Array<TColumns> = [
    {
      title: "Libellé",
      field: "libelle",
      cellStyle:{
        minWidth:"240px",
     
          whiteSpace:"nowrap"
        
      }
    },

    {
      title: "Description",
      field: "description",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
        minWidth:"200px"
      },
    },
    {
      title: "Compte manager",
      field: "compte_manager",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
        minWidth:"200px"
      },
    },
    {
      title: "Ingénieur cybersécurité",
      field: "ingenieur_cybersecurite",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
        minWidth:"200px"
      },
    },
    {
      title: "Analyste cybersécurité",
      field: "analyste_cybersecurite",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
        minWidth:"200px"
      },
    },
    
    {
      title: "Date début",
      field: "date_debut",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
        minWidth:"200px"
      },
      editComponent:(props:any)=>{
        return (
          <Input
          htmlType="date"
          value={props.value}
          onChange={(e: any) => {
            console.log(e.target.value);
            
            props.onChange(e.target.value)
          }}
         
        /> 
        )
      }
    },
    {
      title: "Date fin",
      field: "date_fin",
      cellStyle: {
        opacity: "70%",
        fontSize: "14px",
        minWidth:"200px"
        
      },
      editComponent:(props:any)=>{
        console.log(props.date_debut)
        return (
          <Input
          htmlType="date"
          value={props.value}
          onChange={(e: any) => props.onChange(e.target.value)}
         
        /> 
        )
      }
    },
    {
      title: "Séances / Suivi",
      field: "seances",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth:"200px",
        align:'center'
      },

      render: (props: any) => {
     
      const date=props.date_fin && props.date_fin!=""?new Date(props.date_fin):new Date('3020-01-01')
      console.log(date)
        const show = compareAsc(new Date(), date)==1?false:true

        return show?
        
        <Button
         onClick={()=>router.push(`/workspace/seances/${props.id}`)}
         auto
         type="success"
       
         scale={3/4}
        >
         séances
        </Button>: <Button 
         onClick={()=>router.push(`/workspace/suivis/${props.id}`)}
         auto
         type="error"
         scale={3/4}
        >
         suivi
        </Button>
      },

      editComponent: (props: any) => (<span></span>),
    },
    {
      title: "Client",
      field: "client.libelle",
      cellStyle:{
        whiteSpace:"nowrap",
       
      },
      // editComponent:(props:any)=>{

      //  return <AutoComplete  value={props.value}  disabled={readOnly}  onSelect={(e: any) => props.onChange(e)} disableFreeSolo options={client.data?.map((t,i)=>({label:t.libelle,value:t.libelle}))} />

      // }
      editComponent: (propsTable: any) => {
       
        return (
          <Select
          onChange={propsTable.onChange}
            value={propsTable.value}
            placeholder="Choisir un client">
            
            {client.data?.map((t, i) => (
              <Select.Option key={i} value={t.libelle}>
                {t.libelle}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Appliance",
      field: "appliance.libelle",
      cellStyle:{
       
        whiteSpace:"nowrap"
      },
      // editComponent:(props:any)=>{

      //  return <AutoComplete  value={props.value}  disabled={readOnly}  onSelect={(e: any) => props.onChange(e)} disableFreeSolo options={client.data?.map((t,i)=>({label:t.libelle,value:t.libelle}))} />

      // }
      editComponent: (propsTable: any) => {
       
        return (
          <Select
  
            value={propsTable.value}
            onChange={propsTable.onChange}
            placeholder="Choisir un appliance">
            
            {appliances.data?.map((t, i) => (
              <Select.Option key={i} value={t.libelle}>
                {t.libelle}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <Workspace>
      <Table title="POV" columns={columnsPov} endpoint="pov" />
    </Workspace>
  );
  
};

export default Index;
