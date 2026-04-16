import { Col, Empty, Layout, Pagination, Row, Skeleton } from "antd"
import JobsCard from "../components/JobsCards"
import LandingHero from "../components/LandingHero"
import { useJobs } from "../Hooks/useJobs"
import { useRef, useState } from "react"
import BackTop from "antd/es/float-button/BackTop"

function LandingPage(){
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(8)
    const [search, setSearch] = useState<string|undefined>(undefined)
    const { data, isLoading, isError, error } = useJobs(page, pageSize, search)
    const jobSection = useRef<HTMLDivElement>(null)

    return(
        <Layout className="min-h-dvh!">
            <LandingHero setSearch= {setSearch} setPage={setPage}/>
            <Layout className="max-w-7xl! mx-auto! px-6! pt-10! w-full! min-h-85!" ref={jobSection}>
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Jobs</h2>
                </div>
                {
                    isLoading? (<Skeleton className=""/>):
                    isError || error? (
                        <Empty description={"No Jobs Available!"}/>
                    ):
                    data?.data.length? (
                        <>
                            <Row gutter={[24, 24]} align={"top"}>
                                {data.data.map((job) => (
                                    <Col xs={24} md={24}>
                                        <JobsCard
                                            key={job.jobId}
                                            title={job.title}
                                            dateCreated={job.dateCreated}
                                            roles={JSON.parse(job.roles)}
                                            description={job.description}
                                            jobGuid={job.jobId}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Pagination
                                responsive={true}
                                current={page} 
                                total={data?.meta.TotalRecords} 
                                pageSize={pageSize} 
                                showSizeChanger
                                pageSizeOptions={['4', '8', '12', '20']}
                                className="justify-center py-4! pb-20!"
                                onChange={(page, pageSize) => {
                                    setPage(page)
                                    setPageSize(pageSize)
                                    jobSection.current?.scrollIntoView()
                                }}
                            />
                        </>
                    ):
                    (
                        <Empty description={"No Jobs Available!"} className="flex-1"/>
                    )
                }
            </Layout>
            <BackTop/>
        </Layout>
    )
}
export default LandingPage