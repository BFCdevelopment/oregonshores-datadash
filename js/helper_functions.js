function setWidth(window) {
    var width = $(window).width() * 0.325;
    if ($(window).width() <= 1920 && $(window).width() > 1280) { width = $(window).width() * 0.32; }
    else if ($(window).width() <= 1280 && $(window).width() > 1024) { width = $(window).width() * 0.315; }
    else if ($(window).width() <= 1024) { width = $(window).width() * 0.9; }
    return width;
};

function setHeight(window) {
    var height = $(window).height() * 0.12;
    if ($(window).height() <= 1280 && $(window).height() > 857) { height = $(window).height() * 0.12; }
    else if ($(window).height() <= 857) { height = $(window).height() * 0.12; }
    else if ($(window).height() >= 2000) { height = $(window).height() * 0.12; }
    return height;
};

if ($(window).width() <= 1025) {
    var two_col_width_scale = 0.6;
    var two_col_height_scale = 1.67;
    var two_col_bottom_margin = 55;
    var pie_col_width_scale = 0.75;
    var pie_col_height_scale = 0.75;
    var line_col_width_scale = 1.5;
    var external_radius_padding = 10;
    var network_link_distance = 120;
    var network_body_charge = -30;
    var network_collide = 6;
    var network_graph_width = setWidth(window) * 0.875;
    var network_graph_height = setHeight(window) * 3.25;
} else {
    var two_col_width_scale = 0.5;
    var two_col_height_scale = 1.67;
    var two_col_bottom_margin = 40;
    var pie_col_width_scale = 1.25;
    var pie_col_height_scale = 1.25;
    var line_col_width_scale = 1.625;
    var external_radius_padding = 32;
    var three_col_width_scale = 0.82;
    var three_col_height_scale = 1.67;
    var three_col_bottom_margin = 40;
    var network_link_distance = 120;
    var network_body_charge = -30;
    var network_collide = 12;
    var network_graph_width = setWidth(window) * 1.5;
    var network_graph_height = setHeight(window) * 2.45;
}

const formatMonth = d3.timeFormat("%B %Y");
const fmtUTC = d3.utcFormat("%b %Y");

function reformatDateString(dateObj) {
    return dateObj instanceof Date ? fmtUTC(dateObj) : '';
}
