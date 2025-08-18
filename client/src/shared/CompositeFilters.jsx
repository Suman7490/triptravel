import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TripTypeFilter, BudgetFilter, LocationFilter, TourThemeFilter, DurationFilter, SeasonMonthFilter, ApplyResetButtons } from "./TourFilters";

const CompositeFilters = () => {
    <aside className="card p-4 shadow-sm border-0 bg-light mb-4">
        <h5 className="fw-bold mb-4 text-primary">Filter Your Trip</h5>
        <TripTypeFilter />
        <BudgetFilter />
        <LocationFilter />
        <TourThemeFilter />
        <DurationFilter />
        <SeasonMonthFilter />
        <ApplyResetButtons />
    </aside>
}

export default CompositeFilters