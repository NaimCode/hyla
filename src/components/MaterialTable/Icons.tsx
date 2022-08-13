/* eslint-disable react/display-name */
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {AiOutlineEdit,AiFillCheckCircle} from 'react-icons/ai'
import {MdDeleteOutline} from 'react-icons/md'

export const tableIcons = {
    Add: forwardRef((props:any, ref:any) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props:any, ref:any) => <AiFillCheckCircle {...props} ref={ref} />),
    Clear: forwardRef((props:any, ref:any) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props:any, ref:any) => <MdDeleteOutline {...props} ref={ref} className="opacity-40 transition-all hover:opacity-100 hover:text-red-500"/>),
    DetailPanel: forwardRef((props:any, ref:any) => <ChevronRight {...props} ref={ref} />),
    //
    Edit: forwardRef((props:any, ref:any) => <AiOutlineEdit {...props} ref={ref} className="opacity-40 transition-all hover:opacity-100 hover:text-blue-500" />),
    Export: forwardRef((props:any, ref:any) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props:any, ref:any) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props:any, ref:any) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props:any, ref:any) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props:any, ref:any) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props:any, ref:any) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props:any, ref:any) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props:any, ref:any) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props:any, ref:any) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props:any, ref:any) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props:any, ref:any) => <ViewColumn {...props} ref={ref} />)
  };