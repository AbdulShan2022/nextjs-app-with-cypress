import Link from "next/link"

export default function NavItem({label,path, dataTestId}){
    return (
        <Link data-testid={dataTestId} href={path}>
            {label}
        </Link>
    )
}