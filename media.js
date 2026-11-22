// ===== ตัวช่วยที่ใช้ร่วมกันทั้งหน้าลูกค้าและหลังบ้าน =====
window.Media = {
  isVideo: m => String(m && m.type || "").startsWith("video/"),
  // รูปย่อจาก Google Drive (ใช้ได้ทั้งรูปและวิดีโอ)
  thumb: (id, w = 1200) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${w}`,
  // เล่นวิดีโอผ่านตัวเล่นของ Google Drive
  player: id => `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`,
  open: id => `https://drive.google.com/file/d/${encodeURIComponent(id)}/view`
};
window.Util = {
  esc: s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])),
  fmt: n => (n === null || n === undefined || n === "") ? "" : Number(n).toLocaleString("th-TH"),
  range(a, b){ return a && b ? `${Util.fmt(a)}–${Util.fmt(b)}` : Util.fmt(a || b); },
  safeUrl: u => /^https?:\/\//i.test(String(u || "")) ? String(u) : "",
  postText(p){
    const L = [`🏠 ${p.title}`, `📍 ${p.location || ""}${p.province ? " " + p.province : ""}`];
    if (p.rent) L.push(`💰 เช่า ${Util.range(p.rent, p.rentMax)} บาท/เดือน`);
    if (p.sale) L.push(`💰 ขาย ${Util.range(p.sale, p.saleMax)} บาท`);
    if (p.size) L.push(`📐 ขนาด ${p.size}`);
    if (p.beds || p.baths) L.push(`🛏 ${p.beds || "-"} ห้องนอน • 🚿 ${p.baths || "-"} ห้องน้ำ`);
    if (p.highlights) L.push(`✨ ${p.highlights}`);
    if (p.terms) L.push(`📝 ${p.terms}`);
    if (p.contact) L.push(`📞 ติดต่อ ${p.contact}`);
    L.push(`รหัสทรัพย์ ${p.code}`);
    return L.join("\n");
  },
  async copy(text){
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (e2) {}
      t.remove(); return ok;
    }
  }
};
