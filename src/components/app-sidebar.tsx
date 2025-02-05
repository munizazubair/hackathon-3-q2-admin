"use client";
import { 
    Home, 
    LucideListOrdered, 
    Package, 
    Layers, 
    Users, 
    BarChart, 
    Inbox, 
    Settings, 
    MessageSquare, 
    HelpCircle, 
    Star, 
    CreditCard 
  } from "lucide-react"
  
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  
  // Updated E-commerce Admin Dashboard Menu Items
  const items = [
    {
      title: "Dashboard",
      url: "/admin-add",
      icon: Home,
    },
    {
      title: "Orders",
      url: "/order-add",
      icon: LucideListOrdered,
    },
    {
      title: "Products",
      url: "/product-add",
      icon: Package,
    },
    {
      title: "Customers",
      url: "/customer-add",
      icon: Users,
    },
    {
      title: "Reviews",
      url: "/reviews-add",
      icon: Star, 
    },
    {
      title: "FAQs",
      url: "/faq-add",
      icon: HelpCircle, 
    },
    {
      title: "Payments",
      url: "/payment-add",
      icon: CreditCard, 
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
  
  export function AppSidebar() {
    return (
      <Sidebar >
        <SidebarContent className="bg-color text-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white text-[18px] font-semibold">Comforty</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild className="hover:bg-gray-900">
                      <a href={item.url} className="flex items-center gap-2 p-2 hover:text-white rounded-md">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }
  