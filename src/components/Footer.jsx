import { Map } from "lucide-react"

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-brand">

        <div className="footer-logo">
          <Map size={20} />
          SmartTrip
        </div>

        <p>
          Plan smarter. Travel better.
        </p>

      </div>

      <p className="footer-copy">
        © 2026 SmartTrip. All rights reserved.
      </p>

    </footer>
  )
}

export default Footer