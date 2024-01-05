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
                title: 'Quản lý sản phẩm',
                icon: 'fas fa-cube',
                type: 'collapse',
                children: [
                    {
                        id: 'danh-sach-san-pham',
                        title: 'Danh sách',
                        type: 'item',
                        url: '/p',
                        external: true,
                    }
                ]
            },
            {
                id: 'don-hang',
                title: 'Quản lý đơn hàng',
                icon: 'fas fa-shopping-basket',
                type: 'collapse',
                children: [
                    {
                        id: 'don-hang-new',
                        title: 'Đơn hàng',
                        type: 'collapse',
                        children: [
                            {
                                id: 'don-hang-new',
                                title: 'Đơn hàng mới',
                                type: 'item',
                                url: '/order',
                                external: true,
                            },
                            {
                                id: 'don-hang-completed',
                                title: 'Đã hoàn thành',
                                type: 'item',
                                url: '/order/completed',
                                external: true,
                            },
                            {
                                id: 'don-hang-cancel',
                                title: 'Đơn hàng đã huỷ',
                                type: 'item',
                                url: '/order/cancelled',
                                external: true,
                            }
                        ]
                    }
                ]
            },
            {
                id: 'hoa-don',
                title: 'Quản lý hoá đơn',
                icon: 'fas fa-file-invoice',
                type: 'collapse',
                children: [
                    {
                        id: 'chi-tiet-hoa-don',
                        title: 'Chi tiết',
                        type: 'item',
                        url: '#',
                        external: true,
                    },
                    {
                        id: 'thong-ke-hoa-don',
                        title: 'Thống kê',
                        type: 'item',
                        url: '#',
                        external: true
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
