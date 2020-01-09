import { IProjectApprovals } from "./Types/IProjectApprovals";
import { ProjectApproverTypeAndRangeMapping } from "./Types/ProjectApproverTypeAndRangeMapping";
import { ILookup } from "../Lookups/Types/ILookup";
import { LookupType } from "../Lookups/Types/LookupType";
import { ProjectSignOffStatus } from "./Types/ProjectApprovalEnums";

export const setupInitialApprovalData = (payload) => {
    var initialApprovalData: Array<IProjectApprovals> = [];
    let lookupdata: Array<ILookup> = payload.lookupdata;
    let currencySymbol: string = payload.currencySymbol;
    let projectId: string = payload.projectId;

    let approverTypeList = lookupdata.filter(x => x.lookupItem.toLowerCase() == LookupType.Project_Approver_Type.toLowerCase());
    let pendingApprovalStatus =
        lookupdata.filter(x =>
            x.lookupItem.toLowerCase() == LookupType.Project_Approval_Sign_Off_Status.toLowerCase()
            && x.lookupKey == ProjectSignOffStatus.Draft);

    approverTypeList.forEach(lookupApproverType => {

        let approveRangeMapping = ProjectApproverTypeAndRangeMapping.find(x => x.type == lookupApproverType.lookupKey);
        let approverRange =
            lookupdata.filter(x => x.lookupItem.toLowerCase() == LookupType.Project_Approval_Range.toLowerCase()
                && x.lookupKey == approveRangeMapping?.range);

        let approval: IProjectApprovals = {
            projectId: projectId,
            approvalStatus: ProjectSignOffStatus.Draft,
            approvalStatusDescription: pendingApprovalStatus && pendingApprovalStatus.length > 0 ? pendingApprovalStatus[0].description.toString() : '',
            approverType: lookupApproverType.lookupKey,
            approverTypeDescription: lookupApproverType.description,
            projectApprovalRange: approveRangeMapping ? approveRangeMapping.range : 0,
            projectApprovalRangeDescription:
                approverRange && approverRange.length > 0 ?
                    approverRange[0].description.replace('{CurrencySymbol}', currencySymbol).toString() : '',
            showRangeLabel: !initialApprovalData.some(x => approveRangeMapping && x.projectApprovalRange == approveRangeMapping.range),
            userId: ''
        };

        initialApprovalData.push(approval);

    });
    return initialApprovalData;
};