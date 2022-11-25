import { useContentContext } from "../../../app/contexts/content"

export default function Footer() {
    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { footer: { all_rights, copyright } } } } = content!

    return <footer className="hidden md:block pl-9">
        <div className="flex items-center py-5 border-t border-secondary-700/20 pl-[76px]">
            <div className="text-2xl font-bold mr-4">&copy;</div>

            <div className="text-lg">
                {copyright} {new Date().getFullYear()}. {all_rights} <span className="text-primary font-bold">{app_name}</span>
            </div>
        </div>
    </footer>
}