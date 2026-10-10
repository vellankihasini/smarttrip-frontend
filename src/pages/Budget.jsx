import Navbar from "../components/Navbar"
import {
  Wallet,
  Hotel,
  Utensils,
  Car,
  Ticket
} from "lucide-react"

function Budget() {

  return (
    <div className="app-page">

      <Navbar />

      <main className="dashboard">

        <div className="dashboard-header">

          <div>
            <p className="eyebrow">
              EXPENSE MANAGEMENT
            </p>

            <h1>Trip Budget</h1>

            <p>
              Keep track of your travel spending.
            </p>
          </div>

        </div>


        <div className="budget-overview">

          <div className="budget-main">

            <div className="budget-icon">
              <Wallet />
            </div>

            <div>
              <span>Total Budget</span>
              <h2>₹50,000</h2>
            </div>

          </div>


          <div className="budget-item">
            <span>Spent</span>
            <strong>₹28,500</strong>
          </div>

          <div className="budget-item">
            <span>Remaining</span>
            <strong>₹21,500</strong>
          </div>

        </div>


        <div className="progress-container">

          <div className="progress-header">
            <span>Budget Used</span>
            <strong>57%</strong>
          </div>

          <div className="progress-bar">
            <div className="progress-value"></div>
          </div>

        </div>


        <section className="dashboard-section">

          <div className="section-title-row">

            <div>
              <h2>Expenses</h2>
              <p>Manali Trip</p>
            </div>

          </div>


          <div className="expense-list">

            <div className="expense-row">

              <div className="expense-icon">
                <Hotel />
              </div>

              <div>
                <strong>Accommodation</strong>
                <span>Hotel stay</span>
              </div>

              <b>₹12,000</b>

            </div>


            <div className="expense-row">

              <div className="expense-icon">
                <Utensils />
              </div>

              <div>
                <strong>Food</strong>
                <span>Restaurants & cafés</span>
              </div>

              <b>₹6,500</b>

            </div>


            <div className="expense-row">

              <div className="expense-icon">
                <Car />
              </div>

              <div>
                <strong>Transport</strong>
                <span>Local travel</span>
              </div>

              <b>₹5,000</b>

            </div>


            <div className="expense-row">

              <div className="expense-icon">
                <Ticket />
              </div>

              <div>
                <strong>Activities</strong>
                <span>Adventure & sightseeing</span>
              </div>

              <b>₹5,000</b>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Budget