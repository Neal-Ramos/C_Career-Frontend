import { Col, Empty, Layout, Pagination, Row, Spin } from "antd"
import JobsCard from "../components/JobsCards"
import LandingHero from "../components/LandingHero"
import { useJobs } from "../Hooks/useJobs"
import { useRef, useState } from "react"
import Title from "antd/es/typography/Title"
import Text from "antd/es/typography/Text"

function LandingPage(){
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(8)
    const [search, setSearch] = useState<string|undefined>(undefined)
    const { data, isLoading, isError } = useJobs(page, pageSize, search)
    const jobSection = useRef<HTMLDivElement>(null)

    if(isError)return "Error..."

    return(
        <Layout className="min-h-dvh!">
            <LandingHero setSearch= {setSearch} setPage={setPage}/>
            
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 w-full" ref={jobSection}>
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-4 border-slate-900 pl-6">
                    <div>
                        <Title level={2} className="m-0! text-2xl! font-black!">Open Positions</Title>
                        <Text className="text-slate-400">
                            Displaying <strong>{pageSize}</strong> of {data?.meta.TotalRecords} total opportunities
                        </Text>
                    </div>
                </div>
                
                <Row gutter={[24, 24]}>
                    {
                        isLoading? 
                        <Col xs={24} md={24} lg={24}>
                            <Spin size="large" className="w-full justify-center"/>
                        </Col>:
                        data?.data.length? data?.data.map((job) => (
                            <Col xs={24} md={12} lg={8} key={job.jobId}>
                                <JobsCard
                                    job={job}
                                />
                            </Col>
                        )):
                        <Col xs={24} md={24} lg={24}>
                            <Empty/>
                        </Col>
                    }
                </Row>
                <div className="mt-16 flex justify-center">
                    <Pagination
                    responsive
                    current={page}
                    total={data?.meta.TotalRecords}
                    pageSize={pageSize}
                    pageSizeOptions={['6', '12', '18']}
                    onChange={(p, ps) => {
                        setPage(p);
                        setPageSize(ps);
                        jobSection.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    />
                </div>
            </div>
            <footer className="bg-white border-t border-slate-200 py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-lg font-black text-slate-900 tracking-tighter">C CAREER</div>
                <p className="text-slate-400 text-sm">© 2026 C Career. All rights reserved.</p>
                <div className="flex gap-6 text-sm font-semibold text-slate-600">
                    <a href="#" className="hover:text-blue-600">Privacy</a>
                    <a href="#" className="hover:text-blue-600">Terms</a>
                </div>
                </div>
            </footer>
        </Layout>
    )
}
export default LandingPage