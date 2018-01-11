//点击出现菜单
d3.select("#menu-btn").on("click", function(){
  d3.event.preventDefault();
    console.log(d3.selectAll("#menu-btn .b").classed("close"));
  d3.selectAll("#menu-btn .label").classed("close", !d3.selectAll("#menu-btn .b").classed("close"));
  d3.selectAll("#menu-btn .b").classed("close", !d3.selectAll("#menu-btn .b").classed("close"));

  d3.select("#menu").classed("open", !d3.select("#menu").classed("open"));

  var body = d3.select("body");

  body.classed("frozen", !d3.select("body").classed("frozen"));

  if (body.classed("frozen") === true) {
    body.append("div").attr("class", "page-mask");
  } else {
    d3.select(".page-mask").remove();
  }

  d3.select(".page-mask").on("click", function(){
    d3.select(this).remove();
    d3.selectAll("#menu-btn .b").classed("close", false);
    d3.select("#menu").classed("open", false);
    d3.select("body").classed("frozen", false);
  });
});


  var title = d3.select(".splash-titles h1");


  var maxCarousel = d3.selectAll(".carousel-text").size() - 1, currentPage = 0;

  d3.selectAll(".carousel-btn").on("click", function(d, i){
    if (i && currentPage < maxCarousel) currentPage++;
    else if (i === 0 && currentPage > 0) currentPage--;

    d3.select("#carousel-page").text(currentPage + 1);

    d3.selectAll(".carousel-btn").classed("active", function(dd, ii){
      return !ii && currentPage || ii && currentPage < maxCarousel;
    });
    d3.selectAll(".carousel-text").classed("active", function(dd, ii){
      return ii === currentPage;
    });
  });

  d3.select(".expand-stats-btn").on("click", function(){
    d3.event.preventDefault();
    d3.select(this).classed("close", !d3.select(this).classed("close"));
    d3.select("#nav-bar-scroll").classed("stat-hidden", !d3.select("#nav-bar-scroll").classed("stat-hidden"));
  });

  var splashHeight = d3.select("#splash").node().offsetHeight,
      boundHeight = d3.select(".bound").node().offsetHeight,
      titleNavHeight = d3.select("#title-bar").node().offsetHeight,
      statNavHeight = d3.select("#stats-bar").size() ? d3.select("#stats-bar").node().offsetHeight : 0,
      profNavHeight = d3.select("#profile-nav").node().offsetHeight,
      attr_type = "geo";

  // var firstScroll = true;
  function navScroll(){
    var footerTop = d3.select(".profile-end");
    footerTop = footerTop.size() ? footerTop.node().offsetTop : d3.select("footer").node().offsetTop;

    var sideButtons = d3.selectAll(".section-sidenav-button"), sideNavBottom = 0;
    if (sideButtons.size()) {
      sideNavBottom = sideButtons[0][sideButtons.length - 1].offsetTop + 30;
    }

//获取y坐标
//    var y = d3plus.client.scroll.y(),
      var y = document.body.scrollTop,
        colorTitleNav = y > titleNavHeight,
        showTitleNav = y > splashHeight/2.75,
        showStatNav = y > splashHeight,
        showProfNav = y > (boundHeight - titleNavHeight - statNavHeight) &&
                      (y + sideNavBottom) < footerTop;
      console.log("y==="+y+"  colorTitleNav=="+colorTitleNav);
//    var parallaxScroll = d3.scale.linear()
//      .domain([0, window.innerHeight])
//      .rangeRound([0, window.innerHeight/3.6])
//      .clamp(true);
//d3.scale.linear比例尺
//    d3.selectAll("#splash-image").style("top", parallaxScroll(y) + "px")

    d3.select("#top-nav").classed("filled", colorTitleNav);
    d3.select("nav").classed("filled", colorTitleNav);
    d3.select("#title-bar").classed("visible", showTitleNav);
    d3.select("#home-btn").classed("hidden", showTitleNav);

    d3.select("#stats-bar").classed("visible", showProfNav);
    d3.select(".expand-stats-btn").classed("show", showProfNav);
    d3.select("#profile-nav").classed("visible", showProfNav);
    d3.select("#section-sidenav").classed("visible", showProfNav);

    var active_section;
    var top_buffer = titleNavHeight + profNavHeight + statNavHeight + 15;
    d3.selectAll("header a[name]")
      .each(function(){
        var top = this.parentNode.parentNode.offsetTop;
        if (top - top_buffer < y) {
          active_section = this.name;
        }
      })
    d3.selectAll("#profile-nav li")
      .classed("active", function(){
        return this.getAttribute("data-anchor") === active_section;
      });

    var active_sub;
    var subs = d3.selectAll("section." + active_section + " .category a[name]");
    if (subs.size()) {
      subs.each(function(){
          var top = this.parentNode.offsetTop;
          if (top - top_buffer < y) {
            active_sub = this.name;
          }
        });
    }
    else {
      active_sub = active_section;
    }
    d3.selectAll(".section-sidenav-button")
      .classed("active", function(){
        return this.getAttribute("data-anchor") === active_sub;
      })

  }

  navScroll();
//  scrollFunctions.push(navScroll);
//
//  d3.select("#show-bg").on("click", function(){
//    var show = d3.select("#splash-image").classed("color");
//    d3.select("#splash-image").classed("color", !show);
//    d3.select("#splash .content").classed("hide", !show);
//  });




