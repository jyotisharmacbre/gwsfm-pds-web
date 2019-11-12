import React from 'react';
import { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import validate from './validate';
import { findByTestAtrr,checkProps } from '../../../helpers/unit-test-helper';
import { AddProjectParams } from './AddProjectParams.d';
import { FormErrors } from 'redux-form';

describe('Project Form Validation',()=>{
    describe('Checking required fields',()=>{

        let error:FormErrors<AddProjectParams>;
        
        beforeEach(()=>{
            const expectedProps :AddProjectParams  ={
                projectName: '',
                companyName: '',
                contractName: '',
                projectHead: '',
                projectOwner: '',
                projectManager: '',
                managerExp: true,
                projectScope: '',
                cnNumber: 1,
                projectStatus: '',
                engagementType:'',
                country: '',
                currency: '',
                winProbabilty: '',
                approxValue:'',
                contractType:'',
                cdmNotify: '',
                assetworkedonprimary: '',
                assetworkedonsecond: '',
                assetworkedonthird: '',
                comments: '',
            };
            error = validate(expectedProps);
        });

        it('Project name is required',()=>{
            expect(error.projectName).toBeDefined(); 
        });
        it('Company name is required',()=>{
            expect(error.companyName).toBeDefined(); 
        });
        it('Contract name is required',()=>{
            expect(error.contractName).toBeDefined(); 
        });
        it('Head of project name is required',()=>{
            expect(error.projectHead).toBeDefined(); 
        });
        it('Project owner is required',()=>{
            expect(error.projectOwner).toBeDefined(); 
        });
        it('Project manager name is required',()=>{
            expect(error.projectManager).toBeDefined(); 
        });

        it('Project scope is required',()=>{
            expect(error.projectScope).toBeDefined(); 
        });
        it('Project status is required',()=>{
            expect(error.projectStatus).toBeDefined(); 
        });
        it('Country name is required',()=>{
            expect(error.country).toBeDefined(); 
        });
        it('Probability of winning is required',()=>{
            expect(error.winProbabilty).toBeDefined(); 
        });
        it('Currency is required',()=>{
            expect(error.currency).toBeDefined(); 
        });
        it('Approximate value is required',()=>{
            expect(error.approxValue).toBeDefined(); 
        });
        it('Contract type is required',()=>{
            expect(error.contractType).toBeDefined(); 
        });
        it('CDM notifiable is required',()=>{
            expect(error.cdmNotify).toBeDefined(); 
        });
        it('Asset is required (First)',()=>{
            expect(error.assetworkedonprimary).toBeDefined(); 
        });
        it('Asset is required (Second)',()=>{
            expect(error.assetworkedonsecond).toBeDefined(); 
        });
        it('Asset is required (Third)',()=>{
            expect(error.assetworkedonthird).toBeDefined(); 
        });
        
    });
});
