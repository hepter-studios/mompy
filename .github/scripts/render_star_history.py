import datetime as dt
import json
import math
import os
import pathlib
import urllib.error
import urllib.request


REPO = os.environ.get("STAR_HISTORY_REPO", "hepter-studios/mompy")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
OUT = pathlib.Path("assets/star-history/mompy-star-history.svg")


def github_get(url):
    headers = {
        "Accept": "application/vnd.github.star+json",
        "User-Agent": "mompy-star-history",
    }
    if TOKEN:
        headers["Authorization"] = f"Bearer {TOKEN}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def fetch_star_dates():
    stars = []
    page = 1
    while True:
        url = f"https://api.github.com/repos/{REPO}/stargazers?per_page=100&page={page}"
        batch = github_get(url)
        if not batch:
            break
        for item in batch:
            starred_at = item.get("starred_at")
            if starred_at:
                stars.append(dt.datetime.fromisoformat(starred_at.replace("Z", "+00:00")).date())
        if len(batch) < 100:
            break
        page += 1
    return sorted(stars)


def nice_max(value):
    if value <= 1:
        return 3
    if value <= 3:
        return 4
    if value <= 5:
        return 6
    magnitude = 10 ** int(math.log10(value))
    return int(math.ceil((value + 1) / magnitude) * magnitude)


def svg_escape(value):
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def format_date(value):
    return value.strftime("%b %d")


def build_series(stars):
    today = dt.datetime.now(dt.timezone.utc).date()
    if stars:
        start = min(stars) - dt.timedelta(days=1)
        end = max(today, max(stars) + dt.timedelta(days=1))
    else:
        start = today - dt.timedelta(days=30)
        end = today

    counts_by_day = {}
    for date in stars:
        counts_by_day[date] = counts_by_day.get(date, 0) + 1

    total = 0
    points = [(start, 0)]
    for date in sorted(counts_by_day):
        total += counts_by_day[date]
        points.append((date, total))
    points.append((end, total))
    return start, end, points, total


def render_svg(stars):
    width = 900
    height = 520
    left = 86
    right = 46
    top = 112
    bottom = 72
    plot_w = width - left - right
    plot_h = height - top - bottom

    start, end, points, total = build_series(stars)
    days = max((end - start).days, 1)
    y_max = nice_max(total)

    def x(date):
        return left + ((date - start).days / days) * plot_w

    def y(count):
        return top + (1 - (count / y_max)) * plot_h

    polyline = " ".join(f"{x(date):.2f},{y(count):.2f}" for date, count in points)

    x_ticks = []
    for index in range(6):
        date = start + dt.timedelta(days=round(days * index / 5))
        x_ticks.append((x(date), format_date(date)))

    y_tick_values = list(range(0, y_max + 1, max(1, math.ceil(y_max / 4))))
    if y_tick_values[-1] != y_max:
        y_tick_values.append(y_max)

    grid = []
    for value in y_tick_values:
        yy = y(value)
        grid.append(f'<line x1="{left}" y1="{yy:.2f}" x2="{width - right}" y2="{yy:.2f}" />')

    x_labels = []
    for xx, label in x_ticks:
        x_labels.append(f'<text x="{xx:.2f}" y="{height - 28}" text-anchor="middle">{svg_escape(label)}</text>')

    y_labels = []
    for value in y_tick_values:
        yy = y(value)
        y_labels.append(f'<text x="{left - 18}" y="{yy + 5:.2f}" text-anchor="end">{value}</text>')

    repo_name = svg_escape(REPO)
    updated = svg_escape(dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d"))
    star_word = "star" if total == 1 else "stars"

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">Mompy star history</title>
  <desc id="desc">GitHub star history chart for {repo_name} with {total} {star_word}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0d1117"/>
      <stop offset="1" stop-color="#101510"/>
    </linearGradient>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <style>
    .label {{ fill: #d8e2d2; font: 600 18px Inter, Segoe UI, Arial, sans-serif; }}
    .small {{ fill: #94a391; font: 500 14px Inter, Segoe UI, Arial, sans-serif; }}
    .title {{ fill: #f2fff0; font: 800 30px Inter, Segoe UI, Arial, sans-serif; }}
    .axis {{ stroke: #dce7d8; stroke-width: 3; stroke-linecap: round; }}
    .grid line {{ stroke: #223322; stroke-width: 1; }}
    .line {{ fill: none; stroke: #ff5a62; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }}
  </style>
  <rect width="100%" height="100%" rx="22" fill="url(#bg)"/>
  <rect x="18" y="18" width="{width - 36}" height="{height - 36}" rx="18" fill="none" stroke="#243324"/>
  <text class="title" x="{width / 2}" y="58" text-anchor="middle">Star History</text>
  <text class="small" x="{width - 36}" y="64" text-anchor="end">Updated {updated}</text>
  <g class="grid">
    {''.join(grid)}
  </g>
  <line class="axis" x1="{left}" y1="{top}" x2="{left}" y2="{height - bottom}"/>
  <line class="axis" x1="{left}" y1="{height - bottom}" x2="{width - right}" y2="{height - bottom}"/>
  <g class="small">
    {''.join(y_labels)}
    {''.join(x_labels)}
  </g>
  <text class="label" x="32" y="{top + plot_h / 2}" transform="rotate(-90 32 {top + plot_h / 2})" text-anchor="middle">GitHub Stars</text>
  <polyline class="line" points="{polyline}" filter="url(#softGlow)"/>
  <g transform="translate({left + 20} {top + 18})">
    <rect width="282" height="44" rx="10" fill="#101510" stroke="#dce7d8" stroke-width="2"/>
    <rect x="16" y="15" width="14" height="14" rx="3" fill="#ff5a62"/>
    <text class="label" x="42" y="29">{repo_name}</text>
  </g>
</svg>
'''


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    try:
        stars = fetch_star_dates()
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as error:
        raise SystemExit(f"Failed to fetch stargazers for {REPO}: {error}") from error
    OUT.write_text(render_svg(stars), encoding="utf-8")
    print(f"Rendered {OUT} with {len(stars)} stars.")


if __name__ == "__main__":
    main()
