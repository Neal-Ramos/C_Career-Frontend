import { Button, Card, Tag, Typography } from 'antd';
import { NormalizeDate } from '../helpers/NormalizeDate';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface JobsCards {
    title: string
    dateCreated: string
    roles: { Name: string, Level: string }[]
    description: string
    jobGuid: string
}

function JobsCard({ title, dateCreated, roles, description, jobGuid }: JobsCards) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false)

    return (
        <Card
            className="h-full! border! border-slate-200! shadow-sm! rounded-xl! overflow-hidden! flex! flex-col!"
            styles={{
                body: {
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    flex: 1
                }
            }}
        >
            <div className="flex flex-col grow">
                <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-1">
                    <Title level={4} className="mb-0! text-slate-900! font-bold!">
                        {title}
                    </Title>
                </div>
                
                <Text className="text-slate-500! block! mb-4! font-medium! text-sm!">
                    Posted: {NormalizeDate(dateCreated)}
                </Text>

                <div className="flex flex-wrap gap-2 mb-6">
                    {roles.map((r) => (
                        <Tag 
                            key={r.Name} 
                            className="bg-blue-50! border-blue-100! text-blue-600! rounded-lg! px-3! py-0.5! font-semibold! text-xs!"
                        >
                            {r.Name}
                        </Tag>
                    ))}
                </div>

                <div className="mb-6">
                    <Text className="text-slate-900! font-bold! block! mb-1!">
                        Description
                    </Text>
                    <Paragraph
                        className="text-slate-600! leading-relaxed! text-sm! mb-0!"
                        ellipsis={{
                            rows: 2,
                            expandable: 'collapsible', // Allows showing more and showing less
                            symbol: expanded? "Show Less":"Show More",
                            onExpand:(_, info) => setExpanded(info.expanded),

                            expanded: expanded
                        }}
                    >
                        {description}
                    </Paragraph>
                </div>
            </div>

            <div className="mt-auto pt-4">
                <Button
                    type="primary"
                    size="large"
                    className="w-full! px-8 h-10! rounded-lg! font-bold! shadow-lg! shadow-blue-500/20!"
                    onClick={() => { navigate(`/apply/${jobGuid}`) }}
                >
                    Apply Now
                </Button>
            </div>
        </Card>
    );
}

export default JobsCard;