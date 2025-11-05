import {
  Calendar,
  ScrollText,
  ChartArea,
  Inbox,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SignInButton from "./SingIn"

const items = [
  {
    title: "Jobs List",
    url: "#",
    icon: ScrollText,
  },
  {
    title: "Mails",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Stats",
    url: "#",
    icon: ChartArea,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full px-2 py-4">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-semibold px-3 mb-2 border-b">
              Job Tracker
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <item.icon size={30} className="text-muted-foreground" />
                        <span className="text-md font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        <SidebarFooter className="px-3 pt-4 border-t">
          <SignInButton />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
