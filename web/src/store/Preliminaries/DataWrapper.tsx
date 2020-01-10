import { IPreliminariesComponentDetails } from './Types/IPreliminariesComponentDetails';
import { IPreliminariesItems } from './Types/IPreliminariesItems';
import { IPreliminaries } from './Types/IPreliminaries';
import {IAdminDefaults} from "../ProjectOverviewForm/Types/IAdminDefault"
import AdminFields from '../../enums/AdminFields';
import { CheckConstraints } from '../../helpers/fieldValidations';
import LookupField from '../../enums/LookupFields';

export const bindUserData = (preliminaryData) => {
    var preliminaryDetails:Array<IPreliminariesComponentDetails>=[];
    var componentDetails:IPreliminariesComponentDetails={componentId:'',componentName:'',items:[]};
   
    var lookupData:any=((sessionStorage.getItem("lookupData")));
    lookupData=(lookupData)?JSON.parse(lookupData):[];
    let defaultData:any=(sessionStorage.getItem("defaultParameters"));
    let adminDefaultData:Array<IAdminDefaults>=(defaultData?JSON.parse(defaultData):[]);
    let defaultGrossMargin:number=0;let labourRate:number=0;let insurranceRate:number=0;
    adminDefaultData.map((x)=>{
        if(x.name==AdminFields.GrossMarginPerc){defaultGrossMargin=parseInt(x.value)}
        if(x.name==AdminFields.CBRELabourRatePerc){labourRate=parseInt(x.value)}
    });
    if(lookupData&&lookupData.length>0)
    {
        var pre_components=lookupData.filter((data)=>{return data.lookupItem==LookupField.Pre_Components});
    var pre_component_items=lookupData.filter((data)=>{return data.lookupItem==LookupField.Pre_Component_Items});
   pre_components.map((components)=>{
    componentDetails.componentId=components.lookupKey.toString();
    componentDetails.componentName=components.description;
    var itemDetails: Array<IPreliminariesItems>=[];
    var preData=preliminaryData!=''?preliminaryData.filter((x)=>{return x.preliminariesComponentId==components.lookupKey}):[];
    pre_component_items.map((item)=>{
        if(CheckConstraints(componentDetails.componentId))
        {
            if(itemDetails.length<1)
            {
                itemDetails.push(generateItemDetails(preData,item,labourRate,defaultGrossMargin));
            }
            
        }
        else
        {
            itemDetails.push(generateItemDetails(preData,item,labourRate,defaultGrossMargin));
        }
        
    })
    componentDetails.items=itemDetails;
    let componentData = Object.assign({},componentDetails);
    preliminaryDetails.push(componentData);
   })
    }
   
   return preliminaryDetails;
};
const generateItemDetails=(preData,item,labourRate,defaultGrossMargin)=>
{
    var items:IPreliminariesItems ={itemId: '',itemName: '',preliminaryId:'',nameOfSupplier: '',
    noOfHours: 0,hourRate: 0,totalCost: 0,grossMargin: 0,comments: ''};
    let itemData=preData.filter((itemData)=>{return (itemData.preliminariesItemId==item.lookupKey.toString())});
    items.itemId=item.lookupKey.toString();
    items.itemName=item.description;
    items.preliminaryId=itemData.length>0?(itemData[0].preliminaryId):"";
    items.nameOfSupplier=itemData.length>0?(itemData[0].nameOfSupplier==null?'':itemData[0].nameOfSupplier):'';
    items.noOfHours=itemData.length>0?itemData[0].noOfHours:0;
    items.hourRate=itemData.length>0?itemData[0].hourRate:labourRate;
    items.totalCost=itemData.length>0?itemData[0].totalCost:0;
    items.grossMargin=itemData.length>0?itemData[0].grossMargin:defaultGrossMargin;
    items.comments=itemData.length>0?(itemData[0].comments==null?'':itemData[0].comments):'';
    return items;
}
export const convertIntoDatabaseModel=(userData,projectId)=>{
    let preliminariesList:Array<IPreliminaries>=[];
    
    userData.map((components)=>{
        components.items.map((items)=>{
            let preliminaries:IPreliminaries={PreliminaryId :'',ProjectId :'',PreliminariesItemId :'',PreliminariesComponentId :'',
                                     NameOfSupplier :'',NoOfHours :0,HourRate :0,TotalCost :0,GrossMargin :0,Comments :''};
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