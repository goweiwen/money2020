<template lang="pug">
  .merchant
    button.fab(@click="$emit('directions')")
      b-icon(icon="directions")
      p GO

    h2.name {{ merchant.name }} ({{ merchant.distance.toFixed(1) }} mi)

    Catalog(:items="merchant.items" @select="selectItem")

    b-modal(:active.sync="isModalActive" has-modal-card)
      .modal-card
        header.modal-card-head
          p.modal-card-title Don't worry!
        section.modal-card-body
          p(style="margin-bottom: 0.5em") Thomas,
          p
            | It looks like this purchase exceeds your credit limit.
            | We can extend your credit limit to $1,000 with deferred interest for 12 months.
          p(style="margin-top: 0.5em") Would you like that?
        footer.modal-card-foot
          button.button.is-primary(@click="acceptTerms") Sure!
          button.button(@click="isModalActive = false") No, thank you

    b-modal(:active.sync="isModalFormActive" has-modal-card)
      .modal-card
        section.modal-card-body
          b-field(label="Name")
            b-input(value="Thomas" required)
          b-field(label="Number")
            b-input(value="+1 (650) 1234" required)
          b-field(label="Last 4 digits of SSN")
            b-input(value="" required)
          b-field(label="Postal Code")
            b-input(value="94000" required)
          b-field(label="Card Number")
            b-input(value="" required)
          b-field(label="CVV")
            b-input(value="" required)
        footer.modal-card-foot
          button.button.is-primary(@click="submitForm") Submit
</template>

<script>
import Catalog from "@/components/Catalog";

export default {
  name: "merchant",

  components: { Catalog },

  props: ["merchant"],

  data() {
    return {
      isModalActive: false,
      isModalFormActive: false
    };
  },

  methods: {
    selectItem(i) {
      if (this.merchant.items[i].insufficientCredit) {
        this.isModalActive = true;
      } else {
        this.$toast.open({
          message: `Got it! This item will be waiting for you at ${
            this.merchant.name
          }`,
          type: "is-success"
        });
        this.$emit("route");
      }
    },
    acceptTerms() {
      this.isModalActive = false;
      this.isModalFormActive = true;
    },
    submitForm() {
      this.isModalFormActive = false;
      this.$toast.open({
        message: `Got it! This item will be waiting for you at ${
          this.merchant.name
        }`,
        type: "is-success"
      });
      this.$emit("route");
    }
  }
};
</script>

<style lang="stylus" scoped>
.merchant {
    padding: 1em;

    .name {
        font-size: 1.5em;
    }
}

button.fab {
    position: absolute;
    top: -5em;
    right: 1em;
    width: 4em;
    height: 4em;
    border-radius: 100%;
    border-width: 0px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    background-color: #1E88E5;
    color: #fff;
}

button.fab:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

button.button {
    max-width: 150px;
}
</style>
