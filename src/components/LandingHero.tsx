import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined"
import Input from "antd/es/input/Input"
import Paragraph from "antd/es/typography/Paragraph"
import Title from "antd/es/typography/Title"
import { useEffect, useState } from "react"

interface LandingHero {
    setSearch: Function
    setPage: Function
}

function LandingHero({setSearch, setPage}: LandingHero) {
    const [debounce, setDebounce] = useState("")
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(debounce)
            setPage(1)
        }, 500)
        return () => {
            clearTimeout(handler)
        }
    },[debounce])


    return(
        <div className="relative overflow-hidden bg-[#001529] pb-20 pt-16 lg:pt-32">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
                <Title className="text-white! text-4xl! md:text-6xl! font-bold! mb-6!">
                Find Your Dream <span className="text-blue-400">Career</span> Fast
                </Title>
                
                <Paragraph className="text-gray-400! text-lg! max-w-2xl! mx-auto! mb-10!">
                    C Career connects the best talent with top-tier companies globally. 
                    Search thousands of curated job openings in tech, design, and management.
                </Paragraph>

                <div className="max-w-3xl mx-auto">
                <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-2">
                    <Input 
                        placeholder="Job title, keywords, or company..." 
                        size="large"
                        variant="borderless"
                        prefix={<SearchOutlined className="text-gray-400" />}
                        className="grow py-3 px-4 text-lg"
                        value={debounce}
                        onChange={(e) => {
                            setDebounce(e.target.value)
                        }}
                    />
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-gray-400 text-sm">
                    <span>Popular:</span>
                    <button className="hover:text-white transition-colors">Remote</button>
                    <button className="hover:text-white transition-colors">React</button>
                    <button className="hover:text-white transition-colors">UI Design</button>
                    <button className="hover:text-white transition-colors">Full-time</button>
                </div>
                </div>
            </div>
        </div>
    )
}
export default LandingHero