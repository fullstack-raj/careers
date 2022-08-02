import {
  DetailsList,
  IColumn,
  IconButton,
  IIconProps,
  TooltipHost,
} from "@fluentui/react";
import * as React from "react";
import { FC } from "react";
import { BaseUrlLocal } from "./../CreateProfile/index";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const ViewProfiles: FC = () => {
  const deleteIcon: IIconProps = { iconName: "delete" };
  const editIcon: IIconProps = { iconName: "edit" };

  const onDeleteItem = async (id: number) => {
    debugger;
    await axios.delete(`${BaseUrlLocal}profiles/${id}`).then((res: any) => {
      if (res.status === 200) {
        alert(res);
        getData();
      }
    });
  };

  const navigate = useNavigate();
  const onEditItem = (id: number) => {
    navigate(`/create/${id}`);
  };

  const COLUMDATA: IColumn[] = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 110,
      maxWidth: 250,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      onColumnClick: () => {
        console.log("Column clicked");
      },
      data: "string",
      isPadded: true,
    },
    {
      key: "column1",
      name: "designation",
      fieldName: "designation",
      minWidth: 110,
      maxWidth: 250,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      onColumnClick: () => {
        console.log("Column clicked");
      },
      data: "string",
      isPadded: true,
    },

    {
      key: "column5 ",
      name: "action",
      fieldName: "id",
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      data: "string",
      onColumnClick: () => {
        console.log("Column clicked");
      },
      onRender: (item: any) => (
        <span>
          {item.id && (
            <>
              <IconButton
                iconProps={editIcon}
                title={item.name}
                ariaLabel={item.name}
                onClick={() => onEditItem(item.id)}
              />
              <IconButton
                iconProps={deleteIcon}
                title={item.name}
                ariaLabel={item.name}
                onClick={() => onDeleteItem(item.id)}
              />
            </>
          )}
        </span>
      ),
      isPadded: true,
    },
  ]; 

  const [data, setdata] = React.useState<any>();
  const getData = async () => {
    await axios.get(`${BaseUrlLocal}profiles`).then((res: any) => {
      setdata(res?.data);
    });
  };

  React.useEffect(() => {
    getData();
  }, []);
  return <div >{data && <DetailsList items={data} columns={COLUMDATA} />}</div>;
};
