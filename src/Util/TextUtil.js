class TextUtil {

  formatMoney(num) {
    num = num + ""

    if (num == "" || num == "0")
      return "";

    num = num.replace(/\,/g, "");
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return num_parts.join(".");
  }

  getMonth(index) {
    const months = ["Januari", "Februari", "Maret", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    return months[index - 1]
  }

  formatDate(dateString) {
    if (dateString == null || dateString == "") {
      return dateString;
    }

    try {
      const date = dateString.substring(0, 10);
      let num_parts = date.split("-");
      const month = this.getMonth(parseInt(num_parts[1]))

      return `${parseInt(num_parts[2])} ${month} ${num_parts[0]}`
    } catch (error) {
      return null
    }
  }

}

export default new TextUtil();