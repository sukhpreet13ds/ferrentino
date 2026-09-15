import { useState, useEffect } from 'react';
import './style/estimator.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const CATALOG = [
  {
    key: 'remodel', name: 'Remodels & Additions', services: [
      { key: 'bath_cosmetic', name: 'Cosmetic bath refresh', kind: 'flat', low: 5000, high: 12000 },
      { key: 'bath_standard', name: 'Standard bath remodel', kind: 'flat', low: 15000, high: 30000 },
      { key: 'bath_highend', name: 'High-end bath remodel', kind: 'flat', low: 35000, high: 55000 },
      { key: 'kitchen_minor', name: 'Minor kitchen refresh', kind: 'flat', low: 12000, high: 22000 },
      { key: 'kitchen_mid', name: 'Mid-range kitchen remodel', kind: 'flat', low: 25000, high: 55000 },
      { key: 'room_addition', name: 'Room addition', kind: 'per_sqft', low: 150, high: 250, unitLabel: 'sq ft' },
      { key: 'ada_mods', name: 'ADA modifications', kind: 'flat', low: 3000, high: 15000 }
    ]
  },
  {
    key: 'roofing', name: 'Roofing', services: [
      { key: 'roof_replace', name: 'Full roof replacement', kind: 'flat', low: 8000, high: 20000 }
    ]
  },
  {
    key: 'demo_scope', name: 'Demolition — by scope', services: [
      { key: 'demo_cosmetic', name: 'Selective/cosmetic demo (1–2 surfaces)', kind: 'per_sqft', low: 2, high: 4, unitLabel: 'sq ft' },
      { key: 'demo_single', name: 'Single room gut to studs', kind: 'per_sqft', low: 3, high: 6, unitLabel: 'sq ft' },
      { key: 'demo_full', name: 'Full interior gut (non-structural)', kind: 'per_sqft', low: 4, high: 8, unitLabel: 'sq ft' },
      { key: 'demo_structural', name: 'Full gut with structural work', kind: 'per_sqft', low: 6, high: 12, unitLabel: 'sq ft' }
    ]
  },
  {
    key: 'demo_room', name: 'Demolition — by room', services: [
      { key: 'demo_bath', name: 'Bathroom (full gut)', kind: 'flat', low: 1500, high: 3500 },
      { key: 'demo_kitchen', name: 'Kitchen (full gut)', kind: 'flat', low: 2500, high: 5000 },
      { key: 'demo_bedroom', name: 'Single bedroom/room', kind: 'flat', low: 800, high: 2500 },
      { key: 'demo_multiroom', name: 'Multi-room selective demo', kind: 'flat', low: 3000, high: 8000 },
      { key: 'demo_whole', name: 'Whole-home gut (~1,500 sq ft)', kind: 'flat', low: 5000, high: 15000 }
    ]
  },
  {
    key: 'demo_element', name: 'Demolition — by element', services: [
      { key: 'demo_wall_nl', name: 'Non-load-bearing wall removal', kind: 'per_unit', low: 300, high: 1000, unitLabel: 'walls' },
      { key: 'demo_wall_lb', name: 'Load-bearing wall removal', kind: 'per_unit', low: 2000, high: 10000, unitLabel: 'walls' },
      { key: 'demo_cabinet', name: 'Cabinet removal', kind: 'per_linear_ft', low: 25, high: 50, unitLabel: 'linear ft' },
      { key: 'demo_counter', name: 'Countertop removal', kind: 'flat', low: 50, high: 400 },
      { key: 'demo_fixture', name: 'Toilet/sink/tub/shower removal', kind: 'per_unit', low: 75, high: 250, unitLabel: 'fixtures' },
      { key: 'demo_appl', name: 'Large appliance removal', kind: 'per_unit', low: 75, high: 150, unitLabel: 'each' }
    ]
  },
  {
    key: 'demo_surface', name: 'Demolition — by surface', services: [
      { key: 'demo_carpet', name: 'Carpet & pad removal', kind: 'per_sqft', low: 0.75, high: 1.50, unitLabel: 'sq ft' },
      { key: 'demo_hardwood', name: 'Hardwood/laminate removal', kind: 'per_sqft', low: 1.50, high: 3.00, unitLabel: 'sq ft' },
      { key: 'demo_tile', name: 'Tile flooring removal (slab)', kind: 'per_sqft', low: 2.00, high: 4.50, unitLabel: 'sq ft' },
      { key: 'demo_thinset', name: 'Tile thin-set removal (add on)', kind: 'per_sqft', low: 0.50, high: 1.50, unitLabel: 'sq ft' },
      { key: 'demo_drywall', name: 'Drywall removal', kind: 'per_sqft', low: 1.50, high: 3.50, unitLabel: 'sq ft' },
      { key: 'demo_plaster', name: 'Plaster & lath removal', kind: 'per_sqft', low: 4.00, high: 8.00, unitLabel: 'sq ft' },
      { key: 'demo_ceiling', name: 'Ceiling removal (drywall)', kind: 'per_sqft', low: 1.50, high: 3.00, unitLabel: 'sq ft' },
      { key: 'demo_dropceil', name: 'Drop/suspended ceiling removal', kind: 'per_sqft', low: 1.00, high: 2.50, unitLabel: 'sq ft' },
      { key: 'demo_popcorn', name: 'Popcorn ceiling removal', kind: 'per_sqft', low: 1.50, high: 2.50, unitLabel: 'sq ft' },
      { key: 'demo_insul', name: 'Insulation removal', kind: 'per_sqft', low: 1.00, high: 2.00, unitLabel: 'sq ft' }
    ]
  },
  {
    key: 'dust_containment', name: 'Dust Containment', services: [
      { key: 'dust_poly', name: 'Poly sheeting room barrier (6 mil, taped)', kind: 'per_unit', low: 30, high: 80, unitLabel: 'rooms' },
      { key: 'dust_zipwall', name: 'ZipWall system (poles + zipper)', kind: 'per_unit', low: 50, high: 120, unitLabel: 'zones' },
      { key: 'dust_hepa_rent', name: 'Negative air / HEPA air scrubber (rental)', kind: 'per_unit', low: 75, high: 150, unitLabel: 'weeks' },
      { key: 'dust_hepa_buy', name: 'HEPA air scrubber (purchase)', kind: 'flat', low: 500, high: 1500 },
      { key: 'dust_exhaust', name: 'Exhaust fan + ducted exterior vent setup', kind: 'per_unit', low: 40, high: 100, unitLabel: 'setups' }
    ]
  },
  {
    key: 'concrete_saw', name: 'Concrete Saw Cutting (labor only)', services: [
      { key: 'saw_slab_4', name: 'Slab saw cut (up to 4" deep)', kind: 'per_linear_ft', low: 3, high: 8, unitLabel: 'linear ft' },
      { key: 'saw_slab_6', name: 'Slab saw cut (4"–6" deep)', kind: 'per_linear_ft', low: 6, high: 12, unitLabel: 'linear ft' },
      { key: 'saw_wall', name: 'Wall saw cut (block/CMU)', kind: 'per_linear_ft', low: 8, high: 20, unitLabel: 'linear ft' },
      { key: 'saw_core_4', name: 'Core drilling (up to 4" diameter)', kind: 'per_unit', low: 75, high: 200, unitLabel: 'holes' },
      { key: 'saw_core_8', name: 'Core drilling (4"–8" diameter)', kind: 'per_unit', low: 150, high: 350, unitLabel: 'holes' },
      { key: 'saw_expand', name: 'Expansion joint cutting', kind: 'per_linear_ft', low: 2, high: 5, unitLabel: 'linear ft' }
    ]
  },
  {
    key: 'concrete_break', name: 'Concrete Breaking & Chipping (labor only)', services: [
      { key: 'brk_hand', name: 'Hand demo hammer / chipping', kind: 'per_sqft', low: 3, high: 8, unitLabel: 'sq ft' },
      { key: 'brk_jack_4', name: 'Jackhammer (floor slab, 4" thick)', kind: 'per_sqft', low: 2, high: 6, unitLabel: 'sq ft' },
      { key: 'brk_jack_6', name: 'Jackhammer (floor slab, 6"+ thick)', kind: 'per_sqft', low: 4, high: 10, unitLabel: 'sq ft' },
      { key: 'brk_trench', name: 'Trench cutting for plumbing rough-in', kind: 'per_linear_ft', low: 15, high: 40, unitLabel: 'linear ft' },
      { key: 'brk_footing', name: 'Footing / foundation breaking', kind: 'per_linear_ft', low: 20, high: 55, unitLabel: 'linear ft' },
      { key: 'brk_cmu', name: 'CMU / block wall demolition (per SF of wall face)', kind: 'per_sqft', low: 4, high: 10, unitLabel: 'sq ft' },
      { key: 'brk_spot', name: 'Spot chipping (patch prep)', kind: 'per_sqft', low: 3, high: 7, unitLabel: 'sq ft' }
    ]
  },
  {
    key: 'doors_windows', name: 'Doors & Windows', services: [
      { key: 'ext_door', name: 'Exterior door removal (labor only)', kind: 'per_unit', low: 70, high: 200, unitLabel: 'doors' },
      { key: 'ext_door_disp', name: 'Exterior door + disposal', kind: 'per_unit', low: 95, high: 260, unitLabel: 'doors' },
      { key: 'ext_door_cbs', name: 'CBS/masonry opening add-on (per door)', kind: 'per_unit', low: 75, high: 150, unitLabel: 'doors' },
      { key: 'int_door', name: 'Interior door removal', kind: 'per_unit', low: 40, high: 80, unitLabel: 'doors' },
      { key: 'garage_single', name: 'Single garage door removal', kind: 'per_unit', low: 50, high: 200, unitLabel: 'doors' },
      { key: 'garage_double', name: 'Double garage door removal', kind: 'per_unit', low: 100, high: 300, unitLabel: 'doors' },
      { key: 'garage_full', name: 'Garage door w/ tracks + opener disconnect', kind: 'flat', low: 150, high: 250 }
    ]
  },
  {
    key: 'site_prep', name: 'Site Preparation (before excavation)', services: [
      { key: 'sp_staking', name: 'Staking / layout (contractor self-perform)', kind: 'flat', low: 150, high: 400 },
      { key: 'sp_clearing', name: 'Land clearing, light brush', kind: 'per_unit', low: 1200, high: 3500, unitLabel: 'acres' },
      { key: 'sp_grubbing', name: 'Grubbing & root removal', kind: 'per_unit', low: 800, high: 2500, unitLabel: 'acres' },
      { key: 'sp_tree', name: 'Tree removal (< 18" diameter)', kind: 'per_unit', low: 200, high: 600, unitLabel: 'trees' },
      { key: 'sp_sod', name: 'Sod / grass stripping', kind: 'per_sqft', low: 0.15, high: 0.40, unitLabel: 'sq ft' },
      { key: 'sp_grade', name: 'Fine grading / rough grade', kind: 'per_sqft', low: 0.50, high: 1.50, unitLabel: 'sq ft' }
    ]
  },
  {
    key: 'excavation', name: 'Excavation (labor + equipment)', services: [
      { key: 'ex_sandy', name: 'General excavation — sandy soil', kind: 'per_unit', low: 8, high: 18, unitLabel: 'cubic yd' },
      { key: 'ex_mixed', name: 'General excavation — mixed / rocky soil', kind: 'per_unit', low: 15, high: 35, unitLabel: 'cubic yd' },
      { key: 'ex_limestone', name: 'Limestone rock excavation', kind: 'per_unit', low: 30, high: 75, unitLabel: 'cubic yd' },
      { key: 'ex_footing', name: 'Footing trench excavation', kind: 'per_linear_ft', low: 8, high: 20, unitLabel: 'linear ft' },
      { key: 'ex_hand', name: 'Hand excavation (tight spaces)', kind: 'per_unit', low: 40, high: 100, unitLabel: 'cubic yd' },
      { key: 'ex_add_slab', name: 'Excavation for addition slab (typical 400 SF)', kind: 'flat', low: 400, high: 1200 },
      { key: 'ex_pool', name: 'Pool / deep excavation', kind: 'per_unit', low: 20, high: 45, unitLabel: 'cubic yd' }
    ]
  },
  {
    key: 'fill_material', name: 'Fill & Base Material (delivered)', services: [
      { key: 'fm_clean', name: 'Clean fill dirt', kind: 'per_unit', low: 12, high: 22, unitLabel: 'cubic yd' },
      { key: 'fm_structural', name: 'Compacted structural fill (select fill)', kind: 'per_unit', low: 18, high: 30, unitLabel: 'cubic yd' },
      { key: 'fm_crusher', name: 'Crusher run / compacted base rock', kind: 'per_unit', low: 22, high: 38, unitLabel: 'cubic yd' },
      { key: 'fm_57', name: '#57 limestone (drainage layer)', kind: 'per_unit', low: 28, high: 45, unitLabel: 'cubic yd' },
      { key: 'fm_sand', name: 'Sand (concrete mix / bedding)', kind: 'per_unit', low: 18, high: 30, unitLabel: 'cubic yd' },
      { key: 'fm_recycled', name: 'Recycled concrete aggregate', kind: 'per_unit', low: 15, high: 25, unitLabel: 'cubic yd' }
    ]
  },
  {
    key: 'subgrade', name: 'Subgrade Preparation & Forming', services: [
      { key: 'sg_compact', name: 'Subgrade compaction', kind: 'per_sqft', low: 0.30, high: 0.75, unitLabel: 'sq ft' },
      { key: 'sg_vapor', name: 'Vapor barrier (6 mil poly)', kind: 'per_sqft', low: 0.08, high: 0.15, unitLabel: 'sq ft' },
      { key: 'sg_termite', name: 'Termite pre-treatment (required FL code)', kind: 'per_sqft', low: 0.10, high: 0.25, unitLabel: 'sq ft' },
      { key: 'sg_baserock', name: 'Compacted base rock (4")', kind: 'per_sqft', low: 0.40, high: 0.85, unitLabel: 'sq ft' },
      { key: 'sg_form_str', name: 'Form setting — straight forms', kind: 'per_linear_ft', low: 2.50, high: 5.00, unitLabel: 'linear ft' },
      { key: 'sg_form_cpx', name: 'Form setting — complex shapes', kind: 'per_linear_ft', low: 4.00, high: 8.00, unitLabel: 'linear ft' },
      { key: 'sg_form_lumb', name: 'Form lumber (2× material)', kind: 'per_linear_ft', low: 0.60, high: 1.20, unitLabel: 'linear ft' }
    ]
  },
  {
    key: 'concrete_slab', name: 'Concrete Slab Placement (installed)', services: [
      { key: 'cs_plain', name: 'Plain 4" slab, no rebar (small pad)', kind: 'per_sqft', low: 5.50, high: 9.00, unitLabel: 'sq ft' },
      { key: 'cs_mesh', name: '4" slab with wire mesh', kind: 'per_sqft', low: 6.00, high: 10.00, unitLabel: 'sq ft' },
      { key: 'cs_rebar_4', name: '4" slab with rebar (#3 @ 18" OC)', kind: 'per_sqft', low: 7.00, high: 11.00, unitLabel: 'sq ft' },
      { key: 'cs_rebar_6', name: '6" slab with rebar (garage / heavy load)', kind: 'per_sqft', low: 8.50, high: 13.00, unitLabel: 'sq ft' },
      { key: 'cs_monolithic', name: 'Thickened edge monolithic slab', kind: 'per_sqft', low: 9.00, high: 14.00, unitLabel: 'sq ft' },
      { key: 'cs_posttens', name: 'Post-tension slab (engineer required)', kind: 'per_sqft', low: 11.00, high: 18.00, unitLabel: 'sq ft' },
      { key: 'cs_patch', name: 'Concrete patch', kind: 'per_sqft', low: 8.00, high: 16.00, unitLabel: 'sq ft' }
    ]
  },
  {
    key: 'ready_mix', name: 'Ready-Mix Concrete (material)', services: [
      { key: 'rm_3000', name: 'Ready-mix concrete (3,000 PSI)', kind: 'per_unit', low: 130, high: 165, unitLabel: 'cubic yd' },
      { key: 'rm_4000', name: 'Ready-mix concrete (4,000 PSI)', kind: 'per_unit', low: 145, high: 180, unitLabel: 'cubic yd' },
      { key: 'rm_shortload', name: 'Short load fee (under 5 CY)', kind: 'flat', low: 75, high: 150 },
      { key: 'rm_pump', name: 'Pump truck (if needed)', kind: 'per_unit', low: 500, high: 900, unitLabel: 'pours' },
      { key: 'rm_fiber', name: 'Fiber mesh additive', kind: 'per_unit', low: 8, high: 15, unitLabel: 'cubic yd' },
      { key: 'rm_admix', name: 'Accelerator / retarder admix', kind: 'per_unit', low: 5, high: 15, unitLabel: 'cubic yd' }
    ]
  },
  {
    key: 'reinforcement', name: 'Reinforcement (material)', services: [
      { key: 'rb_3', name: 'Rebar #3 (3/8")', kind: 'per_linear_ft', low: 0.45, high: 0.75, unitLabel: 'linear ft' },
      { key: 'rb_4', name: 'Rebar #4 (1/2")', kind: 'per_linear_ft', low: 0.65, high: 1.00, unitLabel: 'linear ft' },
      { key: 'rb_5', name: 'Rebar #5 (5/8")', kind: 'per_linear_ft', low: 0.90, high: 1.40, unitLabel: 'linear ft' },
      { key: 'rb_mesh', name: 'Wire mesh (6×6 W1.4)', kind: 'per_sqft', low: 0.18, high: 0.35, unitLabel: 'sq ft' },
      { key: 'rb_chairs', name: 'Rebar chairs / supports', kind: 'per_sqft', low: 0.08, high: 0.20, unitLabel: 'sq ft' },
      { key: 'rb_anchor', name: 'Anchor bolts (J-bolt)', kind: 'per_unit', low: 1.50, high: 4.00, unitLabel: 'bolts' },
      { key: 'rb_tiein', name: 'Rebar tie-in to existing slab', kind: 'per_linear_ft', low: 3, high: 7, unitLabel: 'linear ft' }
    ]
  },
  {
    key: 'fireplace_footing', name: 'Fireplace Pier & Footing', services: [
      { key: 'ff_excav', name: 'Hand excavation (tight interior access)', kind: 'flat', low: 150, high: 400 },
      { key: 'ff_compact', name: 'Soil compaction / prep', kind: 'flat', low: 75, high: 150 },
      { key: 'ff_pad_simple', name: 'Simple pad footing (24"×24"×12", poured)', kind: 'flat', low: 300, high: 600 },
      { key: 'ff_pad_std', name: 'Standard fireplace pad (36"×36"×12")', kind: 'flat', low: 450, high: 850 },
      { key: 'ff_pad_large', name: 'Large hearth / masonry fireplace pad (48"×48"×12")', kind: 'flat', low: 650, high: 1200 },
      { key: 'ff_thickslab', name: 'Thickened slab extension (existing slab reinforce)', kind: 'flat', low: 400, high: 900 },
      { key: 'ff_pier', name: 'Isolated pier footing (12" dia, 18" deep)', kind: 'per_unit', low: 200, high: 450, unitLabel: 'piers' }
    ]
  },
  {
    key: 'new_const', name: 'New Construction', services: [
      { key: 'new_sfr_small', name: 'New SFR — up to 1,500 sq ft (permit)', kind: 'permit_new_sfr', size: 'small' },
      { key: 'new_sfr_med', name: 'New SFR — 1,501–2,499 sq ft (permit)', kind: 'permit_new_sfr', size: 'med' },
      { key: 'new_sfr_large', name: 'New SFR — 2,500+ sq ft (permit)', kind: 'permit_new_sfr', size: 'large' },
      { key: 'impact_small', name: 'Impact fees — ≤1,500 sq ft', kind: 'flat', low: 8250, high: 8250 },
      { key: 'impact_med', name: 'Impact fees — 1,501–2,499 sq ft', kind: 'flat', low: 9021, high: 9021 },
      { key: 'impact_large', name: 'Impact fees — ≥2,500 sq ft', kind: 'flat', low: 9500, high: 9500 }
    ]
  },
  {
    key: 'design', name: 'Design & Architectural', services: [
      { key: 'permit_drawings', name: 'Permit drawings (2D CAD, remodel)', kind: 'flat', low: 1500, high: 5000 },
      { key: 'reno_package', name: 'Residential addition/reno permit package', kind: 'flat', low: 3000, high: 8000 },
      { key: 'new_sfr_arch', name: 'New SFR — full architectural set', kind: 'flat', low: 8000, high: 25000 },
      { key: 'design_sqft_simple', name: 'Per sq ft (simple remodels)', kind: 'per_sqft', low: 2, high: 4, unitLabel: 'sq ft' },
      { key: 'design_sqft_complex', name: 'Per sq ft (complex/additions)', kind: 'per_sqft', low: 4, high: 8, unitLabel: 'sq ft' },
      { key: 'arch_hourly', name: 'Licensed principal architect', kind: 'per_hour', low: 150, high: 250, unitLabel: 'hours' },
      { key: 'draft_hourly', name: 'Drafting/CAD technician', kind: 'per_hour', low: 70, high: 120, unitLabel: 'hours' },
      { key: 'plan_revisions', name: 'Plan revisions (minor)', kind: 'per_unit', low: 300, high: 800, unitLabel: 'revisions' },
      { key: 'after_fact_draw', name: 'After-the-fact permit drawings', kind: 'flat', low: 4000, high: 15000 }
    ]
  },
  {
    key: 'engineering', name: 'Structural Engineering', services: [
      { key: 'eng_letter', name: 'Engineering letter / opinion', kind: 'flat', low: 1500, high: 3500 },
      { key: 'eng_complex_calc', name: 'Complex assessment with calculations', kind: 'flat', low: 3500, high: 6000 },
      { key: 'eng_reno_drawings', name: 'Structural renovation drawings', kind: 'flat', low: 2000, high: 6000 },
      { key: 'eng_complex_mods', name: 'Complex structural modifications', kind: 'flat', low: 5000, high: 12000 },
      { key: 'eng_new_res_sqft', name: 'New residential (structural only)', kind: 'per_sqft', low: 2.00, high: 4.50, unitLabel: 'sq ft' },
      { key: 'eng_full_set_sfr', name: 'Full permit set (arch+structural+MEP)', kind: 'flat', low: 8000, high: 25000 },
      { key: 'eng_after_fact', name: 'After-the-fact engineering letter', kind: 'flat', low: 2500, high: 6000 }
    ]
  },
  {
    key: 'mep', name: 'MEP Engineering (Mech / Elec / Plumbing)', services: [
      { key: 'mep_min_set', name: 'MEP permit set (signed & sealed, minimum)', kind: 'flat', low: 500, high: 500 },
      { key: 'mep_sqft', name: 'Residential remodel MEP', kind: 'per_sqft', low: 0.50, high: 3.00, unitLabel: 'sq ft' },
      { key: 'mep_manual_j', name: 'Heat load calc (Manual J)', kind: 'per_unit', low: 100, high: 100, unitLabel: 'A/C units' },
      { key: 'mep_energy', name: 'Energy calculations (FL Energy Code)', kind: 'flat', low: 150, high: 150 },
      { key: 'mep_manual_d', name: 'Duct design (Manual D)', kind: 'per_unit', low: 75, high: 75, unitLabel: 'A/C units' }
    ]
  },
  {
    key: 'trade_labor', name: 'Trade Labor (hourly)', services: [
      { key: 'lab_gc', name: 'General Contractor', kind: 'per_hour', low: 50, high: 100, unitLabel: 'hours' },
      { key: 'lab_electric', name: 'Master Electrician', kind: 'per_hour', low: 80, high: 140, unitLabel: 'hours' },
      { key: 'lab_plumber', name: 'Plumber', kind: 'per_hour', low: 75, high: 150, unitLabel: 'hours' },
      { key: 'lab_hvac', name: 'HVAC Technician', kind: 'per_hour', low: 85, high: 125, unitLabel: 'hours' },
      { key: 'lab_carpenter', name: 'Carpenter / Framing', kind: 'per_hour', low: 20, high: 40, unitLabel: 'hours' },
      { key: 'lab_roofer', name: 'Roofer', kind: 'per_hour', low: 75, high: 125, unitLabel: 'hours' },
      { key: 'lab_painter', name: 'Painter', kind: 'per_hour', low: 20, high: 50, unitLabel: 'hours' },
      { key: 'lab_flooring', name: 'Flooring Installer', kind: 'per_hour', low: 22, high: 45, unitLabel: 'hours' },
      { key: 'lab_laborer', name: 'General Laborer', kind: 'per_hour', low: 13, high: 20, unitLabel: 'hours' },
      { key: 'lab_landscape', name: 'Landscaper', kind: 'per_hour', low: 17, high: 25, unitLabel: 'hours' },
      { key: 'lab_mason_j', name: 'Journeyman mason', kind: 'per_hour', low: 28, high: 45, unitLabel: 'hours' },
      { key: 'lab_mason_m', name: 'Master mason / foreman', kind: 'per_hour', low: 45, high: 65, unitLabel: 'hours' },
      { key: 'lab_mason_t', name: 'Mason tender / laborer', kind: 'per_hour', low: 16, high: 22, unitLabel: 'hours' },
      { key: 'lab_mason_crew', name: 'Mason crew (mason + tender)', kind: 'per_hour', low: 44, high: 67, unitLabel: 'hours' }
    ]
  },
  {
    key: 'permits_addition', name: 'Building Permit — Additions/Alterations', services: [
      { key: 'permit_addition', name: 'Residence addition/alteration (auto-calc)', kind: 'permit_addition' },
      { key: 'permit_accessory', name: 'Accessory structure (frame/masonry/steel)', kind: 'permit_addition' }
    ]
  },
  {
    key: 'permits_trade', name: 'Trade Permits (flat rate)', services: [
      { key: 'p_electric', name: 'Electrical permit', kind: 'flat', low: 100, high: 100 },
      { key: 'p_mech', name: 'Mechanical / HVAC permit', kind: 'flat', low: 100, high: 100 },
      { key: 'p_plumb', name: 'Plumbing permit', kind: 'flat', low: 100, high: 100 },
      { key: 'p_reroof', name: 'Re-roof permit (per squares)', kind: 'permit_reroof' },
      { key: 'p_pool', name: 'Pool / spa (in-ground)', kind: 'flat', low: 250, high: 250 }
    ]
  },
  {
    key: 'permits_misc', name: 'Other Permits (flat rate)', services: [
      { key: 'p_concrete', name: 'Concrete pad / slab', kind: 'flat', low: 110, high: 110 },
      { key: 'p_deck', name: 'Deck (over 1 step)', kind: 'flat', low: 110, high: 110 },
      { key: 'p_demo', name: 'Demolition permit', kind: 'flat', low: 115, high: 115 },
      { key: 'p_fence', name: 'Fence / wall / entranceway', kind: 'flat', low: 125, high: 125 },
      { key: 'p_fire', name: 'Fireplace / chimney', kind: 'flat', low: 100, high: 100 },
      { key: 'p_garage_ch', name: 'Garage door (change only)', kind: 'flat', low: 80, high: 80 },
      { key: 'p_gas', name: 'Gas (natural or propane)', kind: 'flat', low: 140, high: 140 },
      { key: 'p_gen', name: 'Generator', kind: 'flat', low: 165, high: 165 },
      { key: 'p_shutters', name: 'Hurricane shutters', kind: 'flat', low: 80, high: 80 },
      { key: 'p_siding', name: 'Siding / fascia / soffit', kind: 'flat', low: 75, high: 75 },
      { key: 'p_skylight', name: 'Skylight / solar tube', kind: 'flat', low: 90, high: 90 },
      { key: 'p_solar', name: 'Solar PV', kind: 'flat', low: 140, high: 140 },
      { key: 'p_win_door', name: 'Windows / doors change or remodel', kind: 'flat', low: 80, high: 80 },
      { key: 'p_stucco', name: 'Stucco or plaster remodel', kind: 'flat', low: 75, high: 75 },
      { key: 'p_sprinkler', name: 'Fire sprinklers / alarms', kind: 'flat', low: 125, high: 125 }
    ]
  },
  {
    key: 'inspection', name: 'Inspection & Admin Fees', services: [
      { key: 'reinsp_1', name: 'Re-inspection (1st disapproval)', kind: 'flat', low: 50, high: 50 },
      { key: 'reinsp_2', name: 'Re-inspection (same problem, 2nd)', kind: 'flat', low: 200, high: 200 },
      { key: 'afterhours', name: 'After-hours / weekend inspection', kind: 'per_hour', low: 75, high: 75, unitLabel: 'hours' },
      { key: 'prelim_review', name: 'Preliminary plans review (residential)', kind: 'flat', low: 75, high: 75 },
      { key: 'permit_mod', name: 'Permit modification', kind: 'flat', low: 50, high: 50 },
      { key: 'permit_ext', name: 'Permit extension (90 days)', kind: 'flat', low: 30, high: 30 },
      { key: 'temp_co', name: 'Temporary certificate of occupancy', kind: 'flat', low: 75, high: 75 }
    ]
  },
  {
    key: 'other', name: 'Other / Custom Project', services: [
      { key: 'custom', name: 'Custom scope — request a quote', kind: 'custom' }
    ]
  }
];

const GLOBAL_ADDONS = [
  { key: 'dumpster', name: '20-yard dumpster rental', low: 400, high: 650, desc: 'Debris removal container' },
  { key: 'hazmat', name: 'Hazmat present (per sq ft of demo)', low: 8, high: 30, desc: 'Asbestos, lead, or mold — applied to demo sq ft', perSqftOfDemo: true }
];

const fmt = (n) => '$' + Math.round(n).toLocaleString('en-US');

function findService(key) {
  for (const cat of CATALOG) {
    for (const s of cat.services) if (s.key === key) return { service: s, cat };
  }
  return null;
}

function serviceRateLabel(s) {
  if (s.kind === 'flat') return s.low === s.high ? fmt(s.low) : `${fmt(s.low)} – ${fmt(s.high)}`;
  if (s.kind === 'per_sqft') return `$${s.low} – $${s.high} / sq ft`;
  if (s.kind === 'per_unit') return `${fmt(s.low)} – ${fmt(s.high)} / ${s.unitLabel}`;
  if (s.kind === 'per_hour') return s.low === s.high ? `${fmt(s.low)} / hr` : `${fmt(s.low)} – ${fmt(s.high)} / hr`;
  if (s.kind === 'per_linear_ft') return `$${s.low} – $${s.high} / linear ft`;
  if (s.kind === 'permit_new_sfr') {
    const f = { small: '$150 base + $0.125/sq ft', med: '$150 base + $0.15/sq ft', large: '$150 base + $0.18/sq ft' };
    return f[s.size];
  }
  if (s.kind === 'permit_addition') return '$150 base + $0.145/sq ft';
  if (s.kind === 'permit_reroof') return '$125 base + $20/squares';
  if (s.kind === 'custom') return 'Custom quote';
  return '';
}

function serviceNeedsQty(s) {
  return ['per_sqft', 'per_unit', 'per_hour', 'per_linear_ft', 'permit_new_sfr', 'permit_addition', 'permit_reroof'].includes(s.kind);
}

function qtyLabelFor(s) {
  if (s.kind === 'per_sqft') return 'sq ft';
  if (s.kind === 'per_hour') return 'hours';
  if (s.kind === 'per_linear_ft') return 'lin ft';
  if (s.kind === 'per_unit') return s.unitLabel || 'units';
  if (s.kind === 'permit_new_sfr' || s.kind === 'permit_addition') return 'sq ft';
  if (s.kind === 'permit_reroof') return 'squares';
  return '';
}

function lineCost(key, entry) {
  const found = findService(key);
  if (!found) return null;
  const s = found.service;
  const q = parseFloat(entry.qty) || 0;
  if (s.kind === 'flat') return { low: s.low, high: s.high };
  if (s.kind === 'per_sqft') return { low: s.low * q, high: s.high * q };
  if (s.kind === 'per_unit') return { low: s.low * q, high: s.high * q };
  if (s.kind === 'per_hour') return { low: s.low * q, high: s.high * q };
  if (s.kind === 'per_linear_ft') return { low: s.low * q, high: s.high * q };
  if (s.kind === 'permit_new_sfr') {
    const r = { small: 0.125, med: 0.15, large: 0.18 };
    const v = 150 + r[s.size] * q;
    return { low: v, high: v };
  }
  if (s.kind === 'permit_addition') { const v = 150 + 0.145 * q; return { low: v, high: v }; }
  if (s.kind === 'permit_reroof') { const v = 125 + 20 * q; return { low: v, high: v }; }
  if (s.kind === 'custom') return null;
  return null;
}

const Estimator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openCategories, setOpenCategories] = useState({});
  const [cart, setCart] = useState({});
  const [qtyInputs, setQtyInputs] = useState({});
  const [invalidInputKeys, setInvalidInputKeys] = useState({});
  const [addons, setAddons] = useState({});
  const [contingency, setContingency] = useState(true);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', notes: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [submitState, setSubmitState] = useState('idle');

  const toggleCategory = (catKey) => {
    setOpenCategories((prev) => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const handleQtyChange = (key, val) => {
    setQtyInputs((prev) => ({ ...prev, [key]: val }));
    if (cart[key]) {
      setCart((prev) => ({
        ...prev,
        [key]: { ...prev[key], qty: val }
      }));
    }
  };

  const toggleService = (s) => {
    if (cart[s.key]) {
      setCart((prev) => {
        const next = { ...prev };
        delete next[s.key];
        return next;
      });
    } else {
      const needsQty = serviceNeedsQty(s);
      if (needsQty) {
        const val = qtyInputs[s.key];
        if (!val || parseFloat(val) <= 0) {
          setInvalidInputKeys((prev) => ({ ...prev, [s.key]: true }));
          setTimeout(() => {
            setInvalidInputKeys((prev) => ({ ...prev, [s.key]: false }));
          }, 1200);
          return;
        }
        setCart((prev) => ({
          ...prev,
          [s.key]: { qty: val }
        }));
      } else {
        setCart((prev) => ({
          ...prev,
          [s.key]: { qty: 1 }
        }));
      }
    }
  };

  const removeFromCart = (key) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const totalEstimate = () => {
    const items = [];
    let low = 0, high = 0, hasCustom = false, demoSqft = 0;

    for (const [key, entry] of Object.entries(cart)) {
      const found = findService(key);
      if (!found) continue;
      const s = found.service;
      if (s.kind === 'custom') {
        hasCustom = true;
        items.push({ key, name: s.name, custom: true });
        continue;
      }
      const c = lineCost(key, entry);
      if (!c) continue;
      if (found.cat.key.startsWith('demo_') && s.kind === 'per_sqft') {
        demoSqft += (parseFloat(entry.qty) || 0);
      }
      items.push({ key, name: s.name, low: c.low, high: c.high, qty: entry.qty, unit: qtyLabelFor(s) });
      low += c.low;
      high += c.high;
    }

    for (const a of GLOBAL_ADDONS) {
      if (!addons[a.key]) continue;
      if (a.perSqftOfDemo) {
        if (demoSqft > 0) {
          const l = a.low * demoSqft, h = a.high * demoSqft;
          items.push({ key: a.key, name: `${a.name.split(' (')[0]} — ${demoSqft} sq ft`, low: l, high: h, addon: true });
          low += l;
          high += h;
        }
      } else {
        items.push({ key: a.key, name: a.name, low: a.low, high: a.high, addon: true });
        low += a.low;
        high += a.high;
      }
    }

    if (contingency && !hasCustom && low > 0) {
      const cl = low * 0.10, ch = high * 0.15;
      items.push({ key: 'contingency', name: 'Contingency (10–15% buffer)', low: cl, high: ch, addon: true });
      low += cl;
      high += ch;
    }

    return { items, low, high, hasCustom, demoSqft };
  };

  const total = totalEstimate();
  const itemCount = Object.keys(cart).length;

  const openModal = () => {
    setModalOpen(true);
    setSubmitState('idle');
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submitForm = async () => {
    if (!contact.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      alert('Please enter a valid email.');
      return;
    }

    setSubmitState('sending');

    const lineSummary = total.items.filter(i => !i.addon)
      .map(i => `${i.name}${i.qty ? ` (${i.qty} ${i.unit || ''})` : ''}: ${i.custom ? 'custom' : `${fmt(i.low)}–${fmt(i.high)}`}`)
      .join('\n');
    const addonSummary = total.items.filter(i => i.addon)
      .map(i => `${i.name}: ${fmt(i.low)}–${fmt(i.high)}`).join('\n');

    const payload = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      notes: contact.notes,
      estimateLow: total.hasCustom && total.low === 0 ? 'Custom' : fmt(total.low),
      estimateHigh: total.hasCustom && total.low === 0 ? 'Custom' : fmt(total.high),
      lineItems: lineSummary,
      extras: addonSummary || 'none',
      contingency: contingency ? 'included (10–15%)' : 'not included',
      submittedAt: new Date().toISOString()
    };

    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      console.log('Estimator submission (endpoint not configured):', payload);
      setTimeout(() => {
        setSubmitState('success');
      }, 600);
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSubmitState('success');
      } else {
        throw new Error('bad response');
      }
    } catch (err) {
      setSubmitState('error');
    }
  };

  return (
    <div className="estimator-page">
      <div id="est-root">
        {/* Header Section */}
        <div className="est-header">
          <div className="est-eyebrow">
            <span className="est-dot"></span>Marion County · FL
          </div>
          <h1 className="est-title">Build your project estimate</h1>
          <p className="est-subtitle">
            Add any combination of services below to see a ballpark price range. We'll follow up with a firm quote.
          </p>
        </div>

        {/* Layout */}
        <div className="est-layout">
          {/* Services Catalog */}
          <div className="est-panel reveal-zoom">
            <div className="est-panel-head">
              <h2>Services catalog</h2>
              <span className="est-hint">Tap a category to expand</span>
            </div>
            <div id="est-catalog">
              {CATALOG.map((cat) => {
                const inCartCount = cat.services.filter((s) => cart[s.key]).length;
                const isOpen = !!openCategories[cat.key];

                return (
                  <div key={cat.key} className={`est-cat${isOpen ? ' est-open' : ''}`}>
                    <button
                      type="button"
                      className="est-cat-head"
                      onClick={() => toggleCategory(cat.key)}
                    >
                      <span className="est-cat-name-wrap">
                        <span>{cat.name}</span>
                        {inCartCount > 0 && (
                          <span className="est-cat-count est-has">{inCartCount} added</span>
                        )}
                      </span>
                      <span className="est-caret">›</span>
                    </button>

                    <div className="est-cat-body">
                      {cat.services.map((s) => {
                        const inCart = !!cart[s.key];
                        const needsQty = serviceNeedsQty(s);
                        const currentQty = qtyInputs[s.key] !== undefined ? qtyInputs[s.key] : (cart[s.key]?.qty ?? '');
                        const isInvalid = !!invalidInputKeys[s.key];

                        return (
                          <div key={s.key} className="est-svc">
                            <div className="est-svc-info">
                              <div className="est-svc-name">{s.name}</div>
                              <div className="est-svc-rate">{serviceRateLabel(s)}</div>
                            </div>

                            <div className="est-svc-controls">
                              {needsQty && (
                                <>
                                  <input
                                    type="number"
                                    min="1"
                                    step="any"
                                    className="est-qty-input"
                                    style={{ borderColor: isInvalid ? 'var(--est-danger)' : undefined }}
                                    placeholder="0"
                                    value={currentQty}
                                    onChange={(e) => handleQtyChange(s.key, e.target.value)}
                                  />
                                  <span className="est-qty-unit">{qtyLabelFor(s)}</span>
                                </>
                              )}
                              <button
                                type="button"
                                className={`est-add-btn${inCart ? ' est-in-cart' : ''}`}
                                onClick={() => toggleService(s)}
                              >
                                {inCart ? '✓ Added' : 'Add'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Your Estimate Cart Panel */}
          <div className="est-cart-panel reveal-zoom" data-delay="150">
            <div className="est-panel">
              <div className="est-panel-head">
                <h2>Your estimate</h2>
                <span className="est-hint" id="est-cart-count">
                  {itemCount === 1 ? '1 item' : `${itemCount} items`}
                </span>
              </div>

              <div id="est-cart-body">
                {itemCount === 0 ? (
                  <div className="est-cart-empty">
                    Add services from the catalog to build your estimate.
                  </div>
                ) : (
                  <>
                    <div className="est-line-items">
                      {total.items
                        .filter((i) => !i.addon)
                        .map((item) => {
                          const meta = item.qty && item.unit ? `${item.qty} ${item.unit}` : '';
                          return (
                            <div key={item.key} className="est-line">
                              <div>
                                <div className="est-line-name">{item.name}</div>
                                {meta && <div className="est-line-meta">{meta}</div>}
                              </div>
                              <div className="est-line-cost">
                                {item.custom ? (
                                  <span>Custom</span>
                                ) : item.low === item.high ? (
                                  <span>{fmt(item.low)}</span>
                                ) : (
                                  <span>{`${fmt(item.low)}–${fmt(item.high)}`}</span>
                                )}
                              </div>
                              <button
                                type="button"
                                className="est-line-remove"
                                title="Remove"
                                onClick={() => removeFromCart(item.key)}
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}
                    </div>

                    <div className="est-cart-addons">
                      <div
                        style={{
                          fontSize: '13px',
                          fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--est-ink-soft)',
                          marginBottom: '4px'
                        }}
                      >
                        Extras
                      </div>
                      {GLOBAL_ADDONS.map((a) => {
                        if (a.perSqftOfDemo && total.demoSqft === 0) return null;
                        const isOn = !!addons[a.key];
                        return (
                          <label key={a.key} className="est-addon-toggle">
                            <input
                              type="checkbox"
                              checked={isOn}
                              onChange={(e) => setAddons((prev) => ({ ...prev, [a.key]: e.target.checked }))}
                            />
                            <div>
                              <div>{a.name}</div>
                              <div className="est-addon-desc">{a.desc}</div>
                            </div>
                          </label>
                        );
                      })}
                      <label className="est-addon-toggle">
                        <input
                          type="checkbox"
                          checked={contingency}
                          onChange={(e) => setContingency(e.target.checked)}
                        />
                        <div>
                          <div>Add 10–15% contingency</div>
                          <div className="est-addon-desc">Recommended buffer for hidden issues</div>
                        </div>
                      </label>
                    </div>

                    <div className="est-cart-total">
                      <div className="est-total-label">
                        {total.hasCustom ? 'Estimated range + custom' : 'Estimated range'}
                      </div>
                      {total.hasCustom && total.low === 0 ? (
                        <div className="est-total-range">Custom quote</div>
                      ) : (
                        <div className="est-total-range est-mono">
                          {fmt(total.low)}
                          <span className="est-dash">–</span>
                          {fmt(total.high)}
                        </div>
                      )}
                      <div className="est-total-note">
                        Ballpark for planning — final quote based on materials, site conditions, and design.
                      </div>
                    </div>

                    <button type="button" className="est-cta-btn" onClick={openModal}>
                      Send me this estimate →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="est-footer">Ranges are approximate, based on 2026 Marion County rates.</div>

        {/* Modal */}
        {modalOpen && (
          <div
            className="est-modal-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <div className="est-modal">
              {submitState === 'success' ? (
                <div className="est-success-body">
                  <div className="est-success-icon">✓</div>
                  <h2 className="est-success-title">Estimate sent</h2>
                  <p className="est-success-msg">
                    Check your inbox, {contact.name.split(' ')[0] || 'friend'}. We'll follow up within 1 business day.
                  </p>
                  <button type="button" className="est-cta-btn" onClick={closeModal}>
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="est-modal-head">
                    <h2 className="est-modal-title">Get your estimate</h2>
                    <button type="button" className="est-modal-close" onClick={closeModal}>
                      ×
                    </button>
                  </div>
                  <div className="est-modal-body">
                    <div className="est-modal-summary">
                      <span className="est-modal-summary-label">Your estimate</span>
                      <span className="est-modal-summary-value est-mono">
                        {total.hasCustom && total.low === 0
                          ? 'Custom'
                          : `${fmt(total.low)} – ${fmt(total.high)}`}
                      </span>
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-name">
                        Full name
                      </label>
                      <input
                        type="text"
                        className="est-input"
                        id="est-c-name"
                        required
                        value={contact.name}
                        onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="est-input"
                        id="est-c-email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-phone">
                        Phone <span className="est-label-hint">optional</span>
                      </label>
                      <input
                        type="tel"
                        className="est-input"
                        id="est-c-phone"
                        value={contact.phone}
                        onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div className="est-field">
                      <label className="est-label" htmlFor="est-c-notes">
                        Notes <span className="est-label-hint">optional</span>
                      </label>
                      <textarea
                        className="est-input"
                        id="est-c-notes"
                        rows="3"
                        placeholder="Timeline, materials, questions…"
                        value={contact.notes}
                        onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
                      />
                    </div>

                    {submitState === 'error' && (
                      <div className="est-error-msg">
                        Something went wrong. Please try again or call us directly.
                      </div>
                    )}
                  </div>

                  <div className="est-modal-actions">
                    <button type="button" className="est-btn-ghost" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="est-cta-btn"
                      onClick={submitForm}
                      disabled={submitState === 'sending'}
                    >
                      {submitState === 'sending' ? 'Sending…' : 'Send estimate'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Estimator;
