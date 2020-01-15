import { IPreliminaries } from "../Types/IPreliminaries";
import { IPreliminariesComponentDetails } from "../Types/IPreliminariesComponentDetails";
import { IAdminDefaults } from "../../ProjectOverviewForm/Types/IAdminDefault";

export const lookupData: any = [
    {lookupId: 1,
  lookupItem: "Pre_Components",
  lookupKey: 1,
  description: "H&S File Production",
},
{lookupId: 2,
  lookupItem: "Pre_Component_Items",
  lookupKey: 1,
    description: "Sub-Contractor",
  }
];
export const preliminariesData: Array<IPreliminaries>= [
  {
    PreliminaryId :'48315d81-3495-4904-b3ab-010966e27c31',
  ProjectId :'4d27e2e1-843d-435a-b27c-03dca70ce232',
  PreliminariesItemId :'1',
  PreliminariesComponentId :'1',
  NameOfSupplier :'test',
  NoOfHours :0,
  HourRate :0,
  TotalCost :0,
  GrossMargin :0,
  Comments :'test'
}
];
export const preliminariuserData: Array<IPreliminariesComponentDetails>= [
  
    {
      componentId: '1',
      componentName: 'H&S File Production',
      items: [
        {
          itemId: '1',
          itemName: 'Sub-Contractor',
          preliminaryId:'48315d81-3495-4904-b3ab-010966e27c31',
          nameOfSupplier: 'test',
          noOfHours: 0,
          hourRate: 0,
          totalCost: 0,
          grossMargin: 0,
          comments: 'test'
        }
      ]
    }

];
export const newUserData: Array<IPreliminariesComponentDetails>= [
  
  {
    componentId: '1',
    componentName: 'H&S File Production',
    items: [
      {
        itemId: '1',
        itemName: 'Sub-Contractor',
        preliminaryId:'',
        nameOfSupplier: '',
        noOfHours: 0,
        hourRate: 0,
        totalCost: 0,
        grossMargin: 0,
        comments: ''
      }
    ]
  }

];
export const defaultAdminData:Array<IAdminDefaults>=[
  {
    projectParameterId: 1,
    countryId: 1,
    name: "CBRE_Labour_Rate_Perc",
    value: "70"
  },
  {
    projectParameterId: 2,
    countryId: 1,
    name: "Insurance_Rate_Perc",
    value: "1.4"
  },
  {
    projectParameterId: 3,
    countryId: 1,
    name: "Gross_Margin_Perc",
    value: "15"
  }
]
export const expectedDataForDefaultValues: Array<IPreliminariesComponentDetails>= [
  
  {
    componentId: '1',
    componentName: 'H&S File Production',
    items: [
      {
        itemId: '1',
        itemName: 'Sub-Contractor',
        preliminaryId:'',
        nameOfSupplier: '',
        noOfHours: 0,
        hourRate: 0,
        totalCost: 0,
        grossMargin: 15,
        comments: ''
      }
    ]
  }]
  export const expectedDataForInsurrance: Array<IPreliminariesComponentDetails>= [
  
    {
      componentId: '13',
      componentName: 'Insurance Cost',
      items: [
        {
          itemId: '1',
          itemName: 'Sub-Contractor',
          preliminaryId:'',
          nameOfSupplier: '',
          noOfHours: 0,
          hourRate: 0,
          totalCost: 0,
          grossMargin: 15,
          comments: ''
        }
      ]
    }];
    export const lookupDataForInsurrance: any = [
      {lookupId: 1,
    lookupItem: "Pre_Components",
    lookupKey: 13,
    description: "Insurance Cost",
  },
  {lookupId: 2,
    lookupItem: "Pre_Component_Items",
    lookupKey: 1,
      description: "Sub-Contractor",
    }
  
  ];

