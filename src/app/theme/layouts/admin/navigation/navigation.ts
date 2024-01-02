export interface NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'collapse' | 'group';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    external?: boolean;
    target?: boolean;
    breadcrumbs?: boolean;
    badge?: {
        title?: string;
        type?: string;
    };
    children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
    {
        id: 'manager',
        title: 'manager',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                url: '/analytics',
                icon: 'feather icon-home'
            },
            {
                id: 'san-pham',
                title: 'Sản phẩm',
                type: 'collapse',
                icon: 'fas fa-cube',
                children: [
                    {
                        id: 'danh-sach-san-pham',
                        title: 'Danh sách',
                        type: 'item',
                        url: '/p',
                        external: true,
                        icon: 'fas fa-list-ul'
                    }
                ]
            },
            {
                id: 'don-dat-hang',
                title: 'Đơn hàng',
                type: 'item',
                url: '/order',
                icon: 'fas fa-shopping-basket'
            },
            {
                id: 'hoa-don',
                title: 'Hoá đơn',
                type: 'collapse',
                icon: 'fas fa-file-invoice',
                children: [
                    {
                        id: 'chi-tiet-hoa-don',
                        title: 'Chi tiết',
                        type: 'item',
                        url: '#',
                        external: true,
                        icon: 'fas fa-file-alt'
                    },
                    {
                        id: 'thong-ke-hoa-don',
                        title: 'Thống kê',
                        type: 'item',
                        url: '#',
                        external: true,
                        icon: 'fas fa-chart-bar'
                    }
                ]
            }
        ]
    },
    {
        id: 'chart',
        title: 'chart',
        type: 'group',
        icon: 'icon-group',
        children: [
            {
                id: 'doanh-thu',
                title: 'Doanh thu',
                type: 'collapse',
                icon: 'fas fa-chart-line',
                children: [
                    {
                        id: 'doanh-thu-theo-thang',
                        title: 'Theo tháng',
                        type: 'item',
                        url: '#',
                        external: true,
                        icon: 'fas fa-calendar-alt'
                    },
                    {
                        id: 'doanh-thu-theo-nam',
                        title: 'Theo năm',
                        type: 'item',
                        url: '#',
                        external: true,
                        icon: 'fas fa-dollar-sign'
                    }
                ]
            },
        ]
    }
];
