import { Project } from "../models";
import { ProjectInterface } from "../models/project";

const projects: ProjectInterface[] = [
    { name: 'E-menu', description: "A system created to manange and present restaurants menus with a scan of a QR Code.", link: "/", photo: 'e-menu.png' },
    { name: 'Allonounou', description: "A mobile app to hire nanny services. It was created to help busy parents.", link: "/", photo: 'allonounou.png' },
    { name: 'DatEnt', description: "A full web app  for data entry purpose. Created to help data entry services providers in thier tasks.", link: "/", photo: 'datent.png' },
    { name: 'Watched Redesigned', description: "A system created to manange and present restaurants menus with a scan of a QR Code.", link: "/", photo: 'watched-redesigned.png' },
    { name: 'Bus ticket booking App', description: "A mobile app for bus ticket booking. It was created to help dimunish queue at travel agencies.", link: "/", photo: 'bus-ticket-booking-app.png' },
]

export default async function projectsSeed() {
    for await (const project of projects) {
        Project.create(project)
    }
}