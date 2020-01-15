{%- include multilingual.html -%}
{% include head.html %}
{% include header.html %}


<div id="main-content" class="container goal-tiles" role="main">

  <?php
    include("count.php");
    echo "Test";
  ?>

    {% assign country_name = site.country.name | t %}
    {% assign heading_default = t.frontpage.heading_dns | replace: '%name', country_name %}
    <h1>{{ site.frontpage_heading | default: heading_default | t }}</h1>

    {% assign instructions_default = t.frontpage.instructions_dns | replace_first: '%before_link', '<span id="jump-to-search"><a>' | replace_first: '%after_link', '</a></span>' | replace_first: '%name', country_name %}
    <p>{{ site.frontpage_instructions | default: instructions_default | t }}</p>
    {%- assign goals = site.goals | where: 'language', current_language -%}
    {% for goal in goals %}
        {%- assign goal_number = goal.sdg_goal -%}
        {%- assign goal_short_key = goal_number | append: '-short' -%}
        {%- assign goal_short = t.global_goals[goal_short_key] -%}

        {% cycle 'add row' : '<div class="row no-gutters">', '', '', '', '', '' %}
            <div class="col-xs-4 col-md-2">
                <a href="./{{ goal_number }}/">
                  <img src="{{ site.goal_image_base }}/{{ current_language }}/{{ goal_number }}.png" id="goal-{{ goal_number }}" alt="{{ goal_short }} - {{ t.general.goal }} {{ goal_number }}" />
              </a>
            </div>
        {% cycle 'end row' : '', '', '', '', '', '</div>' %}
    {% endfor %}
    {% comment %}
        If there were exactly 17 goals, "pad" it with 1 more, to make it come
        out more symmetrically.
    {% endcomment %}
    {% if goals.size == 17 %}
        <div class="col-xs-4 col-md-2">
          <a href="https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Nachhaltigkeitsindikatoren/Deutsche-Nachhaltigkeit/_inhalt.html">
            <img src="{{ site.goal_image_base }}/{{ current_language }}/18.png" id="goal-18" title="{{ t.frontpage.link_18_title }}" alt="The Global Goals for Sustainable Development" />
          </a>
        </div>
    {% endif %}
    </div>
</div>
{% include footer.html %}
