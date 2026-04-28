import { Badge, Button, Card, Space, Tag} from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Jobs, ParsedRolesJobs } from '../Types/Jobs';
import { ArrowRightOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

interface JobsCard {
    job: Jobs
}

function JobsCard({job}: JobsCard) {
    const navigate = useNavigate();

    const jobRoles: ParsedRolesJobs = JSON.parse(job.roles)

    return (
        <Badge.Ribbon 
            text={job.employmentType} 
            color={job.employmentType === 'Internship' ? 'blue' : 'cyan'}
            className="font-bold text-[10px]"
        >
            <Card 
                hoverable
                className="h-full border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                styles={{ 
                    body: { padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' } 
                }}
            >
                <div className='h-20 flex items-center'>
                    <Title level={4} className="mb-3! mt-0! text-slate-800! leading-tight! hover:text-blue-600! transition-colors">
                        {job.title}
                    </Title>
                </div>
                <div className="h-15 overflow-hidden">
                    {jobRoles.map(role => (
                        <Tag key={role} variant='outlined' className="bg-slate-50 text-slate-500 m-1!">
                            {role}
                        </Tag>
                    ))}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <Space orientation="vertical" size={1}>
                        <Space className="text-[12px] text-slate-500">
                            <EnvironmentOutlined className="text-slate-400" />
                            <span>{job.workArrangement}</span>
                        </Space>
                        <Space className="text-[14px] font-bold text-slate-700">
                            <DollarOutlined className="text-slate-400" />
                            <span>{job.salary || "Not Specified"}</span>
                        </Space>
                    </Space>
                    <Button 
                        type="primary" 
                        shape="circle" 
                        size="large"
                        className="bg-slate-900! border-none! hover:bg-blue-600! shadow-md"
                        icon={<ArrowRightOutlined />}
                        onClick={() => navigate(`/apply/${job.jobId}`)}
                    />
                </div>
            </Card>
        </Badge.Ribbon>
    );
}

export default JobsCard;