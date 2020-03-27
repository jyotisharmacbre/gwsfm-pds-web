import IDashboardChartStatusColourMapping from './IDashboardChartStatusColourMapping';
import ProjectStatus from '../../../enums/ProjectStatus';

const DashboardChartStatusColourMapping: Array<IDashboardChartStatusColourMapping> = [
    { projectStatus: ProjectStatus.InitialCustomerInquiry, colorCode: '#f3cbbf' },
    { projectStatus: ProjectStatus.JA, colorCode: '#f58220' },
    { projectStatus: ProjectStatus.InReview, colorCode: '#ffdd00' },
    { projectStatus: ProjectStatus.BidLost, colorCode: '#ce152c' },
    { projectStatus: ProjectStatus.OnHold, colorCode: '#bfd857' },
    { projectStatus: ProjectStatus.OrderReceived, colorCode: '#A23F97' },
    { projectStatus: ProjectStatus.JAApproved, colorCode: '#b2de94' },
    { projectStatus: ProjectStatus.Live, colorCode: '#00FF00' },
    { projectStatus: ProjectStatus.Completed, colorCode: '#008000' }
]

export default DashboardChartStatusColourMapping;