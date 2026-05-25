import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-black text-slate-900">ICTPET</h3>
          <p className="text-slate-500 text-sm mt-1">Advanced Learning Management System</p>
        </div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
          © 2026 ICTPET Project. Confidential Client Property.
        </p>
      </div>
    </footer>
  );
};

export default Footer;