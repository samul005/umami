import urllib.request
import json
import sys

def login(username, password):
    req = urllib.request.Request(
        'http://127.0.0.1:3000/api/auth/login',
        data=json.dumps({'username': username, 'password': password}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode())

def update_password(token, user_id, new_password):
    req = urllib.request.Request(
        f'http://127.0.0.1:3000/api/users/{user_id}',
        data=json.dumps({'password': new_password}).encode(),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        },
        method='POST'
    )
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode())

def get_websites(token):
    req = urllib.request.Request(
        'http://127.0.0.1:3000/api/websites',
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }
    )
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode())

def create_website(token, name, domain):
    req = urllib.request.Request(
        'http://127.0.0.1:3000/api/websites',
        data=json.dumps({'name': name, 'domain': domain}).encode(),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        },
        method='POST'
    )
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode())

def send_pageview(website_id, domain, url_path):
    payload = {
        'type': 'event',
        'payload': {
            'website': website_id,
            'hostname': domain,
            'screen': '1920x1080',
            'language': 'en-US',
            'url': url_path,
            'referrer': 'https://google.com'
        }
    }
    req = urllib.request.Request(
        'http://127.0.0.1:3000/api/send',
        data=json.dumps(payload).encode(),
        headers={
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        method='POST'
    )
    res = urllib.request.urlopen(req)
    return res.status

def get_website_stats(token, website_id):
    req = urllib.request.Request(
        f'http://127.0.0.1:3000/api/websites/{website_id}/stats?startAt=0&endAt=9999999999999',
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }
    )
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode())

if __name__ == '__main__':
    NEW_PASSWORD = 'VistiqAdmin#2026!'
    
    # Check if login works with new or default
    auth = None
    used_password = None
    for pwd in [NEW_PASSWORD, 'umami']:
        try:
            auth = login('admin', pwd)
            used_password = pwd
            print(f'✓ Login successful with password: {"[NEW_PASSWORD]" if pwd == NEW_PASSWORD else "umami"}')
            break
        except Exception:
            continue

    if not auth:
        print('✗ Login failed with all passwords')
        sys.exit(1)

    token = auth['token']
    user_id = auth['user']['id']
    username = auth['user']['username']
    print(f'✓ Authenticated as: {username} ({user_id})')

    # Change password if still default
    if used_password == 'umami':
        print('Updating admin password to secure custom password...')
        res = update_password(token, user_id, NEW_PASSWORD)
        print('✓ Password updated successfully in Supabase database!')
        # Re-login with new password
        auth = login('admin', NEW_PASSWORD)
        token = auth['token']
        print('✓ Re-login with new password verified!')

    # Ensure website exists
    sites = get_websites(token)
    site_list = sites.get('data', [])
    website_id = None
    for s in site_list:
        if s.get('domain') == 'vistiq.promptgallery.in':
            website_id = s.get('id')
            break

    if not website_id:
        new_site = create_website(token, 'Vistiq Analytics Site', 'vistiq.promptgallery.in')
        website_id = new_site['id']
        print(f'✓ Created new website in Supabase: {new_site["name"]} (ID: {website_id})')
    else:
        print(f'✓ Website already registered in Supabase (ID: {website_id})')

    # Send tracking event
    status = send_pageview(website_id, 'vistiq.promptgallery.in', '/')
    print(f'✓ Sent test pageview to /api/send: HTTP {status}')

    # Send a second pageview
    send_pageview(website_id, 'vistiq.promptgallery.in', '/pricing')
    print('✓ Sent second test pageview to /pricing')

    # Check stats
    stats = get_website_stats(token, website_id)
    print(f'✓ Confirmed stats from Supabase: {stats}')
    print('\n=============================================')
    print('ALL CHECKS PASSED!')
    print(f'Website ID: {website_id}')
    print(f'Admin Username: admin')
    print(f'Admin Password: {NEW_PASSWORD}')
    print('=============================================')
