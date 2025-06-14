"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentUser = null;
function register() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            full_name: document.getElementById('rname').value,
            address: document.getElementById('ralamat').value,
            email: document.getElementById('remail').value,
            password: document.getElementById('rpassword').value,
            role: document.getElementById('rrole').value
        };
        const res = yield fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = yield res.json();
        alert(result.message);
    });
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            email: document.getElementById('lemail').value,
            password: document.getElementById('lpassword').value
        };
        const res = yield fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = yield res.json();
        if (res.ok) {
            currentUser = result.user;
            showDashboard();
        }
        else {
            alert(result.message);
        }
    });
}
function showDashboard() {
    const userInfo = document.getElementById('userinfo');
    userInfo.innerText = `Nama: ${currentUser.full_name}, Email: ${currentUser.email}, Role: ${currentUser.role}`;
    document.getElementById('dashboard').style.display = 'block';
}
function switchRole() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/api/switch_role', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentUser.id })
        });
        const result = yield res.json();
        if (res.ok) {
            currentUser.role = result.new_role;
            showDashboard();
        }
    });
}
