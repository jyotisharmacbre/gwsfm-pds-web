import { IPreliminariesComponentDetails } from './Types/IPreliminariesComponentDetails';
import { IPreliminariesItems } from './Types/IPreliminariesItems';
import { IPreliminaries } from './Types/IPreliminaries';
import {uuid } from "react-uuid";
export const bindUserData = (preliminaryData) => {
    var preliminaryDetails:Array<IPreliminariesComponentDetails>=[];
    var componentDetails:IPreliminariesComponentDetails={componentId:'',componentName:'',items:[]}
    var items:IPreliminariesItems ={itemId: '',itemName: '',preliminaryId:'',nameOfSupplier: '',
                                   noOfHours: 0,hourRate: 0,totalCost: 0,grossMargin: 0,comments: ''};
    var lookupData:any=[];
    lookupData=(sessionStorage.getItem("lookupData"));
    if(lookupData!=null&&lookupData!=undefined)
    {
        var pre_components=lookupData.filter((data)=>{return data.LookupItem=='Pre_Components'});
   var pre_component_items=lookupData.filter((data)=>{return data.LookupItem=='Pre_Component_Items'});
   pre_components.map((components)=>{
    componentDetails.componentId=components.LookupKey.toString();
    componentDetails.componentName=components.Description;
    var preData=preliminaryData.filter((x)=>{return x.PreliminariesComponentId==components.LookupKey});
    pre_component_items.map((item)=>{
        let itemData=preData.filter((itemData)=>{return (itemData.PreliminariesItemId==item.LookupKey.toString())});
        items.itemId=item.LookupKey.toString();
        items.itemName=item.Description;
        items.preliminaryId=itemData.length>0?(itemData.PreliminaryId==null?uuid():itemData.PreliminaryId):'';
        items.nameOfSupplier=itemData.length>0?(itemData.NameOfSupplier==null?'':itemData.NameOfSupplier):'';
        items.noOfHours=itemData.length>0?itemData.NoOfHours:'';
        items.hourRate=itemData.length>0?itemData.HourRate:'';
        items.totalCost=itemData.length>0?itemData.TotalCost:'';
        items.grossMargin=itemData.length>0?itemData.GrossMargin:'';
        items.comments=itemData.length>0?(itemData.Comments==null?'':itemData.Comments):'';
        componentDetails.items.push(items);
    })
    preliminaryDetails.push(componentDetails);
   })
    }
   
   return preliminaryDetails;
};

export const convertIntoDatabaseModel=(userData,projectId)=>{
    let preliminariesList:Array<IPreliminaries>=[];
    let preliminaries:IPreliminaries={PreliminaryId :'',ProjectId :'',PreliminariesItemId :'',PreliminariesComponentId :'',
                                     NameOfSupplier :'',NoOfHours :0,HourRate :0,TotalCost :0,GrossMargin :0,Comments :''};
    userData.map((components)=>{
        components.items.map((items)=>{
preliminaries.PreliminaryId=items.preliminaryId;
preliminaries.ProjectId=projectId;
preliminaries.PreliminariesItemId=items.itemId;
preliminaries.PreliminariesComponentId=components.componentId;
preliminaries.NameOfSupplier=items.nameOfSupplier;
preliminaries.NoOfHours=items.noOfHours;
preliminaries.HourRate=items.hourRate;
preliminaries.TotalCost=items.totalCost;
preliminaries.GrossMargin=items.grossMargin;
preliminaries.Comments=items.comments;
preliminariesList.push(preliminaries);
})
})
return preliminariesList;
}