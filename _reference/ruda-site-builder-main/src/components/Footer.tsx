export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RUDA SYSTEMS</h3>
            <p className="text-white/70 leading-relaxed">
              Think And Act,<br />
              In an Independent Way
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Business Areas</h4>
            <ul className="space-y-2 text-white/70">
              <li>Business Solutions</li>
              <li>Platform Development</li>
              <li>IT Consulting</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>Tel: 07-1204-8027</li>
              <li>www.rudasystems.com</li>
              <li>사업자등록번호: 354-86-01884</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-white/60">
          <p>© 2025 주식회사 루다시스템즈. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
