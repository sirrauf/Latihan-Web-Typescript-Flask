let currentUser: any = null;

async function register() {
    const data = {
        full_name: (document.getElementById('rname') as HTMLInputElement).value,
        address: (document.getElementById('ralamat') as HTMLInputElement).value,
        email: (document.getElementById('remail') as HTMLInputElement).value,
        password: (document.getElementById('rpassword') as HTMLInputElement).value,
        role: (document.getElementById('rrole') as HTMLSelectElement).value
    };

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    const result = await res.json();
    alert(result.message);
}

async function login() {
    const data = {
        email: (document.getElementById('lemail') as HTMLInputElement).value,
        password: (document.getElementById('lpassword') as HTMLInputElement).value
    };

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
        currentUser = result.user;
        showDashboard();
    } else {
        alert(result.message);
    }
}

function showDashboard() {
    const userInfo = document.getElementById('userinfo')!;
    userInfo.innerText = `Nama: ${currentUser.full_name}, Email: ${currentUser.email}, Role: ${currentUser.role}`;
    (document.getElementById('dashboard') as HTMLDivElement).style.display = 'block';
}

async function switchRole() {
    const res = await fetch('/api/switch_role', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: currentUser.id})
    });

    const result = await res.json();
    if (res.ok) {
        currentUser.role = result.new_role;
        showDashboard();
    }
}
